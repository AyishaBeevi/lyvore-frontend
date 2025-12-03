
import { useState, useEffect } from "react";
import api from "../api/axiosClient";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.shippingAddress?.line1 || "",
    city: user?.shippingAddress?.city || "",
    state: user?.shippingAddress?.state || "",
    pincode: user?.shippingAddress?.zip || "",
    country: user?.shippingAddress?.country || "",
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const validItems = items.filter((i) => i?.productId);

  const calculateDiscountedPrice = (product) => {
    if (!product || !product.price) return 0;
    return product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  };

  const total = validItems.reduce(
    (sum, i) => sum + calculateDiscountedPrice(i.productId) * (i.quantity || 0),
    0
  );

  const isFormValid = Object.values(shipping).every(
    (val) => val && val.trim() !== ""
  );

  const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/payments/verify",
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          items: validItems.map((i) => ({
            productId: i.productId._id,
            quantity: i.quantity,
            price: calculateDiscountedPrice(i.productId),
          })),
          shippingAddress: shipping,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Payment & Order verified:", res.data);
      alert("✅ Payment successful! Your order has been placed.");

      // Clear cart after successful order
await api.delete('/cart/clear');  // 🧹 backend clear
clearCart();                      // 🧠 frontend clear

    } catch (err) {
      console.error("Payment verification failed:", err.response?.data || err);
      alert("❌ Payment verification failed. Check backend logs.");
    }
  };

//   const pay = async () => {
//     if (!isFormValid) {
//       alert("Please fill all shipping details.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await api.post("/payments/create-order", {
//         amount: total,
//         currency: "INR",
//       });

//       const options = {
//         key: data.key,
//         amount: data.order.amount,
//         currency: data.order.currency || "INR",
//         order_id: data.order.id,
//         name: "LYVORE",
//         description: "Order Payment",
//         prefill: {
//           name: shipping.name,
//           email: shipping.email,
//           contact: shipping.phone,
//         },
//         theme: { color: "#10B981" },
//         handler: async (response) => {
//           const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
//           if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//             alert("❌ Invalid payment response!");
//             return;
//           }
//           await verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
//         },
//       };
// const scriptLoaded = await loadRazorpayScript();
// if (!scriptLoaded) {
//   alert("Failed to load payment gateway. Try again.");
//   setLoading(false);
//   return;
// }

// const rzp = new window.Razorpay(options);
// rzp.open();
//       // const rzp = new window.Razorpay(options);
//       // rzp.open();
//       rzp.on("payment.failed", (response) => {
//         console.error("Payment failed:", response.error);
//         alert("❌ Payment failed: " + response.error.description);
//       });
//     } catch (err) {
//       console.error("Payment initiation error:", err.response?.data || err);
//       alert("Payment initiation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true); // already loaded

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const pay = async () => {
  if (!isFormValid) {
    alert("Please fill all shipping details.");
    return;
  }

  setLoading(true);
  try {
    // 1. Load Razorpay script first
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load payment gateway script.");
      setLoading(false);
      return;
    }

    const { data } = await api.post("/payments/create-order", {
      amount: total,
      currency: "INR",
    });

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: data.order.currency || "INR",
      order_id: data.order.id,
      name: "LYVORE",
      description: "Order Payment",
      prefill: {
        name: shipping.name,
        email: shipping.email,
        contact: shipping.phone,
      },
      theme: { color: "#10B981" },
      handler: async (response) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
          alert("❌ Invalid payment response!");
          return;
        }

        await verifyPayment(
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        );
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", (response) => {
      console.error("Payment failed:", response.error);
      alert("❌ Payment failed: " + response.error.description);
    });
  } catch (err) {
    console.error("Payment initiation error:", err.response?.data || err);
    alert("Payment initiation failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container-max py-10 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Shipping Form */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Address", name: "address", type: "textarea" },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Pincode", name: "pincode", type: "text" },
              { label: "Country", name: "country", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={shipping[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={shipping[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {validItems.map((item) => {
              const product = item.productId;
              const discountedPrice = calculateDiscountedPrice(product);
              const hasDiscount = product.discount && product.discount > 0;

              return (
                <li
                  key={product._id || product.id}
                  className="py-2 flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span>{product.name}</span>
                    {hasDiscount ? (
                      <span className="text-sm text-green-600">
                        ₹{discountedPrice.toFixed(2)}{" "}
                        <span className="text-gray-500 line-through ml-1 text-xs">
                          ₹{product.price}
                        </span>{" "}
                        <span className="text-xs text-green-600">
                          ({product.discount}% off)
                        </span>
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">₹{product.price}</span>
                    )}
                  </div>
                  <span className="font-medium">
                    ₹{(discountedPrice * item.quantity).toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={pay}
            disabled={!isFormValid || loading}
            className={`w-full py-3 rounded font-semibold text-white transition ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
        </div>
      </div>
    </div>
  );
}
