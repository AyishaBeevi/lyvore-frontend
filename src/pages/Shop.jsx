import { useEffect, useState } from 'react';
import api from '../api/axiosClient';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    })();
  }, []);

  return (
    <div className="container-max py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map(p => <ProductCard key={p._id} product={p} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products available.
        </p>
      )}
    </div>
  );
}
