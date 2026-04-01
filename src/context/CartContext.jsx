import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'maisonrouge-cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const getCartItemId = (product) => {
    if (product.variantId) return `${product._id}_${product.variantId}`;
    return product._id || product.slug;
  };

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const id = getCartItemId(product);
      const existing = prev.find(
        (item) => getCartItemId(item.product) === id
      );
      if (existing) {
        return prev.map((item) =>
          getCartItemId(item.product) === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) =>
      prev.filter(
        (item) => getCartItemId(item.product) !== productId
      )
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        getCartItemId(item.product) === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => {
        const amount = item.product.price?.amount;
        const price = amount != null ? amount : (parseFloat(item.product.price) || 0);
        return sum + price * item.quantity;
      }, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
