import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useRef } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [clicked, setClicked] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const imgRef = useRef(null);

  const handleAdd = () => {
    addToCart(product, 1);

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
    imgClone.style.borderRadius = '12px';

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

  const imageUrl =
    product.images?.[0]?.startsWith('http')
      ? product.images[0]
      : product.images?.[0]
      ? `${import.meta.env.VITE_API_URL}${product.images[0]}`
      : 'https://via.placeholder.com/400x300?text=No+Image';

  const discountedPrice =
    product.discount && product.discount > 0
      ? (product.price - (product.price * product.discount) / 100).toFixed(0)
      : product.price;

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500">

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          ref={imgRef}
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* overlay (desktop only) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition duration-500"></div>

        {/* badges */}
        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-2 py-1 text-xs text-white rounded-full">
            {product.discount}% OFF
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}

        {/* DESKTOP HOVER CTA */}
        <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 gap-2">

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="px-4 py-2 text-sm rounded-full backdrop-blur bg-white/90 text-black font-medium shadow-lg hover:bg-black hover:text-white transition"
          >
            Add
          </button>

          <Link
            to={`/product/${product.slug}`}
            className="px-4 py-2 text-sm rounded-full bg-black text-white font-medium shadow-lg hover:opacity-80 transition"
          >
            View
          </Link>
        </div>
      </div>

      {/* INFO */}
      <div className="p-3 md:p-4">

        <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">
          {product.name}
        </h3>

        <div className="mt-1 md:mt-2">
          {product.discount > 0 ? (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400 line-through">
                ₹{product.price}
              </span>
              <span className="text-black font-semibold">
                ₹{discountedPrice}
              </span>
            </div>
          ) : (
            <span className="text-black font-semibold">
              ₹{product.price}
            </span>
          )}
        </div>

        {/* MOBILE ACTIONS*/}
        <div className="flex md:hidden gap-2 mt-3">

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex-1 py-2 text-sm rounded-full bg-black text-white font-medium"
          >
            {product.stock === 0 ? "Unavailable" : "Add"}
          </button>

          <Link
            to={`/product/${product.slug}`}
            className="flex-1 py-2 text-sm rounded-full border border-black text-center"
          >
            View
          </Link>
        </div>
      </div>

      {/* +1 animation */}
      {showPlus && (
        <span className="absolute bottom-16 left-1/2 -translate-x-1/2 text-sm text-green-600 font-bold animate-fade-up">
          +1
        </span>
      )}

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