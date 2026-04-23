
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axiosClient";
// import { useCart } from "../context/CartContext";

// export default function ProductDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get(`/products/slug/${slug}`);
//         setProduct(res.data.product);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       }
//     })();
//   }, [slug]);

//   if (!product)
//     return <p className="p-6 text-gray-600 text-center">Loading product...</p>;

//   const mainImage =
//   product.images?.[0]
//     ? product.images[0].startsWith("http")
//       ? product.images[0]
//       : `https://lyvore-backend.onrender.com${product.images[0]}`
//     : "https://via.placeholder.com/400";

//   const handleAddToCart = () => {
//     if (quantity > 0) addToCart(product, quantity);
//   };

//   const handleBuyNow = async () => {
//     if (quantity > 0) {
//       await addToCart(product, quantity);
//       navigate("/checkout");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-xl">
//       {/* Grid Layout */}
//       <div className="grid md:grid-cols-2 gap-10">

//         {/* Left Column - Images */}
//         <div>
//           {/* Main Image */}
//           <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border shadow-sm">
//             <img
//               src={mainImage}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Thumbnails */}
//           {product.images?.length > 1 && (
//             <div className="flex flex-wrap gap-3 mt-4">
//               {product.images.slice(1).map((img, i) => (
//                 <div
//                   key={i}
//                   className="aspect-[4/5] w-24 overflow-hidden rounded border cursor-pointer"
//                 >
//                   <img
//                     src={
//   img.startsWith("http")
//     ? img
//     : `https://lyvore-backend.onrender.com/${img}`
// }
//                     className="w-full h-full object-cover"
//                     alt={`Thumbnail ${i + 1}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Right Column - Details */}
//         <div>
//           <h1 className="text-3xl font-semibold text-gray-800 mb-2">
//             {product.name}
//           </h1>

//           <p className="text-gray-600 mb-4 leading-relaxed">
//             {product.description}
//           </p>

//           {/* Pricing */}
//           <div className="mb-6">
//             <p className="text-xl font-semibold text-gray-800">
//               Price:{" "}
//               {product.discount > 0 ? (
//                 <>
//                   <span className="line-through text-gray-400">
//                     ₹{product.price}
//                   </span>
//                   <span className="ml-2 text-green-600 font-bold text-2xl">
//                     ₹{product.discountedPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span className="text-2xl text-green-700 font-bold">
//                   ₹{product.price}
//                 </span>
//               )}
//             </p>

//             <p className="mt-2 text-sm text-gray-500">
//               (Inclusive of all taxes)
//             </p>
//           </div>
// <p className={product.stock === 0 ? "text-red-600 font-bold" : "text-green-600"}>
//   {product.stock === 0 ? "Out of Stock" : `In Stock: ${product.stock}`}
// </p>

//           {/* Meta Info */}
//           <div className="space-y-2 text-gray-700 mb-6">
//             <p><strong>Category:</strong> {product.category}</p>

//             {product.tags?.length > 0 && (
//               <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
//             )}

//             <p>
//               <strong>Stock:</strong>{" "}
//               <span
//                 className={
//                   product.stock > 0 ? "text-green-600" : "text-red-500"
//                 }
//               >
//                 {product.stock > 0
//                   ? `${product.stock} available`
//                   : "Out of Stock"}
//               </span>
//             </p>
//           </div>

//           {/* Quantity + Buttons */}
//           {product.stock > 0 && (
//             <div className="flex flex-col gap-4">
//               {/* Quantity Selector */}
//               <div className="flex items-center border rounded-lg w-fit">
//                 <button
//                   onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
//                   className="px-3 py-1 text-xl"
//                 >
//                   −
//                 </button>
//                 <span className="px-4 py-1">{quantity}</span>
//                 <button
//                   onClick={() =>
//                     setQuantity((q) => (q < product.stock ? q + 1 : product.stock))
//                   }
//                   className="px-3 py-1 text-xl"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-wrap gap-4">
//                 <button
//                   onClick={handleAddToCart}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
//                 >
//                   🛒 Add to Cart
//                 </button>

//                 <button
//                   onClick={handleBuyNow}
//                   className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
//                 >
//                   ⚡ Buy Now
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/products/slug/${slug}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    })();
  }, [slug]);

  if (!product)
    return (
      <p className="p-10 text-center text-[#785c3a] text-lg">
        Loading product...
      </p>
    );

  const images = product.images?.map((img) =>
    img.startsWith("http")
      ? img
      : `https://lyvore-backend.onrender.com${img}`
  );

  const mainImage = images?.[activeImage] || "https://via.placeholder.com/400";

  const handleAddToCart = () => {
    if (quantity > 0) addToCart(product, quantity);
  };

  const handleBuyNow = async () => {
    if (quantity > 0) {
      await addToCart(product, quantity);
      navigate("/checkout");
    }
  };

  return (
    <div className="bg-[#faf6f1] min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT - IMAGES */}
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg bg-white">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Thumbnails */}
          {images?.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 object-cover rounded-lg cursor-pointer border ${
                    activeImage === i
                      ? "border-[#ac8e68]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - DETAILS */}
        <div className="flex flex-col justify-center">

          {/* TITLE */}
          <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-[#ac8e68] via-[#e2c29a] to-[#785c3a] bg-clip-text text-transparent">
            {product.name}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-[#785c3a] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="mb-6">
            {product.discount > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through text-lg">
                  ₹{product.price}
                </span>
                <span className="text-3xl font-bold text-[#785c3a]">
                  ₹{product.discountedPrice}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-[#785c3a]">
                ₹{product.price}
              </span>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Inclusive of all taxes
            </p>
          </div>

          {/* STOCK */}
          <p
            className={`mb-6 font-medium ${
              product.stock === 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            {product.stock === 0
              ? "Out of Stock"
              : `${product.stock} items available`}
          </p>

          {/* META */}
          <div className="text-[#785c3a] mb-6 space-y-2 text-sm">
            <p><strong>Category:</strong> {product.category}</p>
            {product.tags?.length > 0 && (
              <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
            )}
          </div>

          {/* ACTIONS */}
          {product.stock > 0 && (
            <>
              {/* Quantity */}
              <div className="flex items-center border border-[#e2c29a] rounded-lg w-fit mb-6 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="px-4 py-2 hover:bg-[#f5eee7]"
                >
                  −
                </button>
                <span className="px-6">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      q < product.stock ? q + 1 : product.stock
                    )
                  }
                  className="px-4 py-2 hover:bg-[#f5eee7]"
                >
                  +
                </button>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 rounded-xl bg-[#785c3a] text-white font-medium shadow-md hover:opacity-90 transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="px-6 py-3 rounded-xl border border-[#785c3a] text-[#785c3a] font-medium hover:bg-[#785c3a] hover:text-white transition"
                >
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}