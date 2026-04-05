import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, removeFromCart, addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const validItems = items.filter((item) => item?.productId);

  const calculateDiscountedPrice = (product) => {
    if (product.discount && product.discount > 0) {
      return product.price - (product.price * product.discount) / 100;
    }
    return product.price;
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to proceed to checkout");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  const total = validItems.reduce((sum, i) => {
    const price = calculateDiscountedPrice(i.productId);
    return sum + price * i.quantity;
  }, 0);

  // ---------- EMPTY STATE ----------
  if (!validItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <h1
          className="text-4xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: "#785c3a" }}
        >
          Your Cart
        </h1>

        <p className="text-gray-600 mb-6">
          Your collection is waiting to be curated.
        </p>

        <Link
          to="/shop"
          className="px-8 py-3 bg-black text-white rounded-full hover:opacity-80 transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#faf6f1] min-h-screen px-4 md:px-12 py-10">

      {/* ---------- HEADER ---------- */}
      <h1
        className="text-4xl mb-10"
        style={{ fontFamily: "'Playfair Display', serif", color: "#785c3a" }}
      >
        Your Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* ---------- ITEMS ---------- */}
        <div className="lg:col-span-2 space-y-6">

          {validItems.map((item, idx) => {
            const product = item.productId;
            if (!product) return null;

            const imageUrl = product.images?.[0]
              ? product.images[0].startsWith("http")
                ? product.images[0]
                : `${backendURL}${product.images[0]}`
              : "/placeholder.png";

            const discountedPrice = calculateDiscountedPrice(product);
            const hasDiscount = product.discount && product.discount > 0;

            const handleDecrement = () => {
              if (item.quantity > 1) addToCart(product, -1);
            };

            const handleIncrement = () => {
              if (item.quantity < (product.stock ?? Infinity)) {
                addToCart(product, 1);
              } else {
                toast.error(`Only ${product.stock} units available`);
              }
            };

            return (
              <motion.div
                key={product._id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition"
              >

                {/* LEFT */}
                <div className="flex items-center gap-5">

                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div>
                    <h2 className="font-medium text-lg">{product.name}</h2>

                    {hasDiscount ? (
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="line-through text-gray-400">
                          ₹{product.price}
                        </span>
                        <span className="text-black font-semibold">
                          ₹{discountedPrice.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <p className="text-gray-600 mt-1">
                        ₹{product.price}
                      </p>
                    )}

                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="text-sm text-red-500 mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-3">

                  {/* Quantity */}
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 gap-3">
                    <button onClick={handleDecrement}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                  </div>

                  {/* Price */}
                  <p className="font-semibold text-lg">
                    ₹{(discountedPrice * item.quantity).toFixed(2)}
                  </p>

                </div>

              </motion.div>
            );
          })}
        </div>


        {/* ---------- SUMMARY ---------- */}
        <div className="bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-24">

          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-6 text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-black text-white rounded-full hover:opacity-90 transition mb-3"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full py-3 border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Clear Cart
          </button>

        </div>

      </div>
    </main>
  );
}