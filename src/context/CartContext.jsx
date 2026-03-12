import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosClient";
import toast from "react-hot-toast";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- Fetch Cart ----------------
  const fetchCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setItems([]);
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

  // Run on load
  useEffect(() => {
    fetchCart();
  }, []);

  // ---------------- Add to Cart ----------------
  const addToCart = async (product, quantity = 1) => {

    if (!product) return;

    const token = localStorage.getItem("token");

    // Block guest users immediately
    if (!token) {

      toast.error("Login required to add items to cart");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

      return;
    }

    const existing = items.find(i => i.productId._id === product._id);
    const currentQty = existing?.quantity || 0;
    const stock = product.stock ?? Infinity;

    if (currentQty + quantity > stock) {
      toast.error(`Only ${stock} units available`);
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

      toast.success("Added to cart");

    } catch (err) {

      if (err.response?.status === 401) {

        toast.error("Session expired. Please login again");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);

        return;
      }

      console.error("Failed to add to cart:", err);
      toast.error("Failed to add item to cart");

    }
  };

  // ---------------- Remove Item ----------------
  const removeFromCart = async (productId) => {

    try {

      const { data } = await api.post("/cart/remove", { productId });

      setItems(
        data.items?.map((item) => ({
          ...item,
          quantity: Math.max(item.quantity, 1),
        })) || []
      );

      toast.success("Item removed");

    } catch (err) {

      console.error("Failed to remove from cart:", err);
      toast.error("Failed to remove item");

    }
  };

  // ---------------- Clear Cart ----------------
  const clearCart = async () => {

    try {

      await api.delete("/cart/clear");
      setItems([]);
      toast.success("Cart cleared");

    } catch (err) {

      console.error("Failed to clear cart:", err);
      toast.error("Failed to clear cart");

    }
  };

  // ---------------- Cart Count ----------------
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