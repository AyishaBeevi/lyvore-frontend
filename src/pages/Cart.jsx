// import { useCart } from "../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";

// export default function Cart() {
//   const { items, removeFromCart, addToCart } = useCart();
//   const navigate = useNavigate();
//   const backendURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   const validItems = items.filter((item) => item?.productId);

//   const calculateDiscountedPrice = (product) => {
//     if (product.discount && product.discount > 0) {
//       return product.price - (product.price * product.discount) / 100;
//     }
//     return product.price;
//   };

//   const total = validItems.reduce((sum, i) => {
//     const price = calculateDiscountedPrice(i.productId);
//     return sum + price * i.quantity;
//   }, 0);

//   if (!validItems.length) {
//     return (
//       <div className="flex flex-col items-center justify-center py-10">
//         <h1 className="text-3xl font-bold text-brand-brown">Your Cart</h1>
//         <p className="text-gray-700 mt-2">Looks like your cart is empty for now.</p>
//         <Link
//           to="/shop"
//           className="mt-4 px-6 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark transition"
//         >
//           Go Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

//       <div className="space-y-4">
//         {validItems.map((item, idx) => {
//           const product = item.productId;
//           if (!product) return null;

//           const imageUrl = product.images?.[0]
//             ? product.images[0].startsWith("http")
//               ? product.images[0]
//               : `${backendURL}${product.images[0]}`
//             : "/placeholder.png";

//           const discountedPrice = calculateDiscountedPrice(product);
//           const hasDiscount = product.discount && product.discount > 0;

//           return (
//             <div
//               key={product._id || idx}
//               className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={imageUrl}
//                   alt={product.name}
//                   className="w-20 h-20 object-cover rounded-md border"
//                   onError={(e) => (e.target.src = "/placeholder.png")}
//                 />
//                 <div>
//                   <h2 className="font-medium text-lg">{product.name}</h2>
//                   {hasDiscount ? (
//                     <div className="flex items-center gap-2 text-sm">
//                       <p className="text-gray-500 line-through">₹{product.price}</p>
//                       <p className="text-green-600 font-semibold">
//                         ₹{discountedPrice.toFixed(2)}
//                       </p>
//                       <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
//                         -{product.discount}%
//                       </span>
//                     </div>
//                   ) : (
//                     <p className="text-sm text-gray-600">₹{product.price}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   className="px-2 py-1 bg-gray-200 rounded"
//                   onClick={() => addToCart(product, -1)}
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   className="px-2 py-1 bg-gray-200 rounded"
//                   onClick={() => addToCart(product, 1)}
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="text-right">
//                 <p className="font-semibold">
//                   ₹{(discountedPrice * item.quantity).toFixed(2)}
//                 </p>
//                 <button
//                   className="text-red-500 text-sm mt-1 hover:underline"
//                   onClick={() => removeFromCart(product._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-8 flex justify-between items-center border-t pt-6">
//         <h2 className="text-xl font-semibold">Total: ₹{total.toFixed(2)}</h2>
//         <button
//           onClick={() => navigate("/checkout")}
//           className="px-6 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark transition"
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// }


import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, addToCart,clearCart } = useCart();
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const validItems = items.filter((item) => item?.productId);

  const calculateDiscountedPrice = (product) => {
    if (product.discount && product.discount > 0) {
      return product.price - (product.price * product.discount) / 100;
    }
    return product.price;
  };

  const total = validItems.reduce((sum, i) => {
    const price = calculateDiscountedPrice(i.productId);
    return sum + price * i.quantity;
  }, 0);

  if (!validItems.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-3xl font-bold text-brand-brown">Your Cart</h1>
        <p className="text-gray-700 mt-2">Looks like your cart is empty for now.</p>
        <Link
          to="/shop"
          className="mt-4 px-6 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      <div className="space-y-4">
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
            if (item.quantity > 1) {
              addToCart(product, -1); // decrease quantity by 1
            }
          };

          const handleIncrement = () => {
            if (item.quantity < (product.stock ?? Infinity)) {
              addToCart(product, 1); // increase quantity by 1
            } else {
              alert(`Only ${product.stock} units available`);
            }
          };

          return (
            <div
              key={product._id || idx}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md border"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
                <div>
                  <h2 className="font-medium text-lg">{product.name}</h2>
                  {hasDiscount ? (
                    <div className="flex items-center gap-2 text-sm">
                      <p className="text-gray-500 line-through">₹{product.price}</p>
                      <p className="text-green-600 font-semibold">
                        ₹{discountedPrice.toFixed(2)}
                      </p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        -{product.discount}%
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">₹{product.price}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₹{(discountedPrice * item.quantity).toFixed(2)}
                </p>
                <button
                  className="text-red-500 text-sm mt-1 hover:underline"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="mt-8 flex justify-between items-center border-t pt-6">
        <h2 className="text-xl font-semibold">Total: ₹{total.toFixed(2)}</h2>
        <button
          onClick={() => navigate("/checkout")}
          className="px-6 py-2 bg-brand-brown text-white rounded-md hover:bg-brand-dark transition"
        >
          Proceed to Checkout
        </button>
      </div> */}

      <div className="mt-8 flex justify-between items-center border-t pt-6">

  <h2 className="text-xl font-semibold">Total: ₹{total.toFixed(2)}</h2>

  <div className="flex items-center gap-4">
    
    <button
      onClick={clearCart}
      className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Clear Cart
    </button>

    <button
      onClick={() => navigate("/checkout")}
      className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
    >
      Proceed to Checkout
    </button>
  </div>
</div>

    </div>
  );
}
