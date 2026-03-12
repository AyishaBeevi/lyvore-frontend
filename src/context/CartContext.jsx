import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosClient";
import toast from "react-hot-toast";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
 const fetchCart = async () => {

  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }

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
  } finally {
    setLoading(false);
  }
};

  // Add product to cart
 const addToCart = async (product, quantity = 1) => {
  if (!product) return;

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login to add items to cart");
    setTimeout(() => {
  window.location.href = "/login";
}, 1500);
    return;
  }

  const existing = items.find((i) => i.productId._id === product._id);
  const currentQty = existing?.quantity || 0;
  const stock = product.stock ?? Infinity;

  if (currentQty + quantity > stock) {
    alert(`Only ${stock} units of this product in stock`);
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

    if (err.response?.status === 401) {
      alert("You must login before adding items to cart");
      window.location.href = "/login";
      return;
    }

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
