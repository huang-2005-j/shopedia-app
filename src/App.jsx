import React, { useState, useEffect, useMemo } from 'react';
import productsData from './data/product.json';
import Navbar from './components/NavBar';
import Toast from './components/Toast';
import CatalogView from './components/catalog/CatalogView';
import CartView from './components/cart/CartView';
import NoteModal from './components/modals/NoteModal';
import CheckoutModal from './components/modals/CheckoutModal';

export default function App() {
  const [view, setView] = useState('catalog');
  const [products] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShops, setSelectedShops] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Inisialisasi Keranjang dari localStorage[cite: 1]
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedProducts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeNoteModal, setActiveNoteModal] = useState(null);
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const uniqueShops = useMemo(() => {
    const map = new Map();
    products.forEach(p => {
      if (p.shop && !map.has(p.shop.id)) {
        map.set(p.shop.id, p.shop.name);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [products]);

  useEffect(() => {
    if (uniqueShops.length > 0 && selectedShops.length === 0) {
      setSelectedShops(uniqueShops.map(s => s.id));
    }
  }, [uniqueShops]);

  const toggleShopFilter = (shopId) => {
    setSelectedShops(prev => 
      prev.includes(shopId) ? prev.filter(id => id !== shopId) : [...prev, shopId]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesShop = selectedShops.length === 0 || selectedShops.includes(p.shop.id);
      return matchesSearch && matchesShop;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const pA = a.price * (1 - (a.discount_percentage || 0) / 100);
        const pB = b.price * (1 - (b.discount_percentage || 0) / 100);
        return pA - pB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const pA = a.price * (1 - (a.discount_percentage || 0) / 100);
        const pB = b.price * (1 - (b.discount_percentage || 0) / 100);
        return pB - pA;
      });
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0));
    }

    return result;
  }, [products, searchTerm, selectedShops, sortBy]);

  // Operasi Keranjang[cite: 1]
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, checked: true, note: '' }];
    });
    showToast(`"${product.title}" berhasil masuk ke keranjang!`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const removeShopItems = (shopName) => setCart(prev => prev.filter(item => item.shop.name !== shopName));
  const clearCart = () => {
    if (window.confirm('Kosongkan semua barang di keranjang?')) setCart([]);
  };

  const toggleItemCheck = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const toggleShopCheck = (shopName, willCheck) => {
    setCart(prev => prev.map(item => item.shop.name === shopName ? { ...item, checked: willCheck } : item));
  };

  const toggleSelectAll = (willCheck) => {
    setCart(prev => prev.map(item => ({ ...item, checked: willCheck })));
  };

  const handleOpenNote = (item) => {
    setActiveNoteModal(item);
    setNoteInput(item.note || '');
  };

  const saveNote = () => {
    if (activeNoteModal) {
      setCart(prev => prev.map(item => item.id === activeNoteModal.id ? { ...item, note: noteInput } : item));
      setActiveNoteModal(null);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'SHOPEDIA10') {
      setAppliedCoupon({ code: 'SHOPEDIA10', discountRate: 0.1 });
      showToast('Kupon hemat 10% berhasil dipasang!');
      setCouponCode('');
    } else {
      alert('Kode kupon tidak valid. Coba: SHOPEDIA10');
    }
  };

  const checkedItems = cart.filter(i => i.checked);
  const totalQuantity = checkedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = checkedItems.reduce((sum, item) => {
    const finalPrice = item.price * (1 - (item.discount_percentage || 0) / 100);
    return sum + finalPrice * item.quantity;
  }, 0);

  const couponDiscount = appliedCoupon ? subtotalPrice * appliedCoupon.discountRate : 0;
  const grandTotal = Math.max(0, subtotalPrice - couponDiscount);

  const groupedCart = useMemo(() => {
    const groups = {};
    cart.forEach(item => {
      const sName = item.shop?.name || 'Toko';
      if (!groups[sName]) groups[sName] = [];
      groups[sName].push(item);
    });
    return groups;
  }, [cart]);

  const isAllCartChecked = cart.length > 0 && cart.every(i => i.checked);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <Toast message={toastMessage} />

      <Navbar 
        view={view} 
        setView={setView} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {view === 'catalog' ? (
          <CatalogView 
            products={filteredProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            uniqueShops={uniqueShops}
            selectedShops={selectedShops}
            toggleShopFilter={toggleShopFilter}
            onAddToCart={addToCart}
          />
        ) : (
          <CartView 
            cart={cart}
            groupedCart={groupedCart}
            isAllCartChecked={isAllCartChecked}
            toggleSelectAll={toggleSelectAll}
            clearCart={clearCart}
            setView={setView}
            onToggleShopCheck={toggleShopCheck}
            onRemoveShopItems={removeShopItems}
            onToggleCheck={toggleItemCheck}
            onUpdateQty={updateQuantity}
            onRemove={removeItem}
            onOpenNote={handleOpenNote}
            totalQuantity={totalQuantity}
            subtotalPrice={subtotalPrice}
            appliedCoupon={appliedCoupon}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={() => setAppliedCoupon(null)}
            grandTotal={grandTotal}
            onCheckout={() => setIsCheckoutModalOpen(true)}
          />
        )}
      </main>

      <NoteModal 
        item={activeNoteModal}
        noteInput={noteInput}
        setNoteInput={setNoteInput}
        onSave={saveNote}
        onClose={() => setActiveNoteModal(null)}
      />

      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        checkedItems={checkedItems}
        subtotalPrice={subtotalPrice}
        appliedCoupon={appliedCoupon}
        grandTotal={grandTotal}
        onConfirmPayment={() => {
          alert('Pembayaran Berhasil! Terima kasih sudah berbelanja di Shopedia.');
          setIsCheckoutModalOpen(false);
          setCart(prev => prev.filter(item => !item.checked));
          setView('catalog');
        }}
      />
    </div>
  );
}