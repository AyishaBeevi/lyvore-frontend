import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useRef } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [clicked, setClicked] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const imgRef = useRef(null);

  const handleAdd = () => {
  addToCart(product, 1); // ✅ Pass the full product
  setClicked(true);
  setTimeout(() => setClicked(false), 400);

  setShowPlus(true);
  setTimeout(() => setShowPlus(false), 600);

  flyToCart();
};


  const flyToCart = () => {
    const cartIcon = document.querySelector('#cart-icon');
    if (!cartIcon || !imgRef.current) return;

    const imgClone = imgRef.current.cloneNode(true);
    const imgRect = imgRef.current.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    imgClone.style.position = 'fixed';
    imgClone.style.top = `${imgRect.top}px`;
    imgClone.style.left = `${imgRect.left}px`;
    imgClone.style.width = `${imgRect.width}px`;
    imgClone.style.height = `${imgRect.height}px`;
    imgClone.style.transition = 'all 0.7s ease-in-out';
    imgClone.style.zIndex = 1000;
    imgClone.style.borderRadius = '8px';

    document.body.appendChild(imgClone);

    requestAnimationFrame(() => {
      imgClone.style.top = `${cartRect.top}px`;
      imgClone.style.left = `${cartRect.left}px`;
      imgClone.style.width = '20px';
      imgClone.style.height = '20px';
      imgClone.style.opacity = '0.5';
    });

    imgClone.addEventListener('transitionend', () => {
      imgClone.remove();
    });
  };

  // 🖼️ Determine image URL
  const imageUrl =
    product.images?.[0]?.startsWith('http')
      ? product.images[0]
      : product.images?.[0]
      ? `http://localhost:5000${product.images[0]}`
      : 'https://via.placeholder.com/400x300?text=No+Image';

  // 💰 Calculate discounted price
  const discountedPrice =
    product.discount && product.discount > 0
      ? (product.price - (product.price * product.discount) / 100).toFixed(0)
      : product.price;


  return (
    <div className="border rounded-xl2 p-3 shadow-soft relative overflow-hidden group bg-white hover:shadow-md transition-all">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow">
          {product.discount}% OFF
        </div>
      )}

      {/* Product Image */}
      <img
        ref={imgRef}
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      {product.stock === 0 && (
  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
    Out of Stock
  </span>
)}

      {/* Product Info */}
      <div className="mt-3">
        <h3 className="font-medium">{product.name}</h3>

        {product.discount > 0 ? (
          <p className="text-sm">
            <span className="line-through text-gray-400">₹{product.price}</span>{' '}
            <span className="ml-1 text-green-600 font-semibold">
              ₹{discountedPrice}
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-800 font-medium">₹{product.price}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-3 flex gap-2 relative">
        <button
    onClick={handleAdd}
    disabled={product.stock === 0}
    className={`px-3 py-1 border border-black font-medium rounded transition-all relative
      ${product.stock === 0
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : clicked
          ? "bg-black text-white scale-105 shadow-lg"
          : "text-black hover:bg-black hover:text-white hover:scale-105"
      }`}
  >
    {product.stock === 0 ? "Unavailable" : "Add to Cart"}
  </button>

        {showPlus && (
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-sm text-green-600 font-bold animate-fade-up">
            +1
          </span>
        )}

        <Link
          className="px-3 py-1 border border-black text-black font-medium rounded transition-all relative hover:bg-black hover:text-white"
          to={`/product/${product.slug}`}
        >
          Details
        </Link>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(0); }
            20% { opacity: 1; transform: translateY(-10px); }
            100% { opacity: 0; transform: translateY(-30px); }
          }
          .animate-fade-up {
            animation: fadeUp 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
