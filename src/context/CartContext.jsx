import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosClient";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setItems(
        data.items?.map((item) => ({
          ...item,
          quantity: Math.max(item.quantity, 1),
        })) || []
      );
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add product to cart
  const addToCart = async (product, quantity = 1) => {
    if (!product) return;

    const existing = items.find((i) => i.productId._id === product._id);
    const currentQty = existing?.quantity || 0;
    const stock = product.stock ?? Infinity;

    if (currentQty + quantity > stock) {
      alert(` Only ${stock} units of this product in stock`);
      return;
    }

    try {
      const { data } = await api.post("/cart/add", {
        productId: product._id,
        quantity,
      });
      setItems(
        data.items?.map((item) => ({
          ...item,
          quantity: Math.max(item.quantity, 1),
        })) || []
      );
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.post("/cart/remove", { productId });
      setItems(
        data.items?.map((item) => ({
          ...item,
          quantity: Math.max(item.quantity, 1),
        })) || []
      );
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setItems([]);
    }
  };

  // Total items in cart
  const totalItems = items.reduce((sum, i) => sum + (i.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        loading,
        addToCart,
        removeFromCart,
        fetchCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
