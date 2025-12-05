
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
    return <p className="p-6 text-gray-600 text-center">Loading product...</p>;

  const mainImage =
  product.images?.[0]
    ? product.images[0].startsWith("http")
      ? product.images[0]
      : `https://lyvore-backend.onrender.com${product.images[0]}`
    : "https://via.placeholder.com/400";

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
    <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-xl">
      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Left Column - Images */}
        <div>
          {/* Main Image */}
          <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border shadow-sm">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {product.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] w-24 overflow-hidden rounded border cursor-pointer"
                >
                  <img
                    src={
  img.startsWith("http")
    ? img
    : `https://lyvore-backend.onrender.com/${img}`
}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="mb-6">
            <p className="text-xl font-semibold text-gray-800">
              Price:{" "}
              {product.discount > 0 ? (
                <>
                  <span className="line-through text-gray-400">
                    ₹{product.price}
                  </span>
                  <span className="ml-2 text-green-600 font-bold text-2xl">
                    ₹{product.discountedPrice}
                  </span>
                </>
              ) : (
                <span className="text-2xl text-green-700 font-bold">
                  ₹{product.price}
                </span>
              )}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              (Inclusive of all taxes)
            </p>
          </div>
<p className={product.stock === 0 ? "text-red-600 font-bold" : "text-green-600"}>
  {product.stock === 0 ? "Out of Stock" : `In Stock: ${product.stock}`}
</p>

          {/* Meta Info */}
          <div className="space-y-2 text-gray-700 mb-6">
            <p><strong>Category:</strong> {product.category}</p>

            {product.tags?.length > 0 && (
              <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
            )}

            <p>
              <strong>Stock:</strong>{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of Stock"}
              </span>
            </p>
          </div>

          {/* Quantity + Buttons */}
          {product.stock > 0 && (
            <div className="flex flex-col gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded-lg w-fit">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="px-3 py-1 text-xl"
                >
                  −
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => (q < product.stock ? q + 1 : product.stock))
                  }
                  className="px-3 py-1 text-xl"
                >
                  +
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
                >
                  ⚡ Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
