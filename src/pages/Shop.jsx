// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';

// export default function Shop() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const baseURL = import.meta.env.VITE_API_URL || '';
//         const { data } = await axios.get(`${baseURL}/api/products`, {
//           withCredentials: true,
//         });

//         setProducts(data.products || []);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       }
//     })();
//   }, []);

//   return (
//     <div className="container-max py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.length > 0 ? (
//         products.map((p) => <ProductCard key={p._id} product={p} />)
//       ) : (
//         <p className="col-span-full text-center text-gray-500">
//           No products available.
//         </p>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { motion } from "framer-motion";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL || '';
        const { data } = await axios.get(`${baseURL}/api/products`, {
          withCredentials: true,
        });

        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    })();
  }, []);

  return (
    <main className="w-full bg-[#faf6f1] min-h-screen">

      {/* ---------- HEADER (PREMIUM HERO) ---------- */}
      <section className="relative py-20 px-6 md:px-16 text-center overflow-hidden">

        {/* background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5eee7] to-transparent"></div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-wide z-10 relative"
          style={{ fontFamily: "'Playfair Display', serif", color: "#785c3a" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Collection
        </motion.h1>

        <motion.p
          className="mt-4 text-gray-600 max-w-xl mx-auto z-10 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Carefully curated products designed to elevate your everyday lifestyle.
        </motion.p>
      </section>


      {/* ---------- PRODUCTS GRID ---------- */}
      <section className="container-max px-4 md:px-8 pb-20">

        {products.length > 0 ? (

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            {products.map((p) => (
              <motion.div
                key={p._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>

        ) : (

          <motion.div
            className="flex flex-col items-center justify-center py-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-lg mb-4">
              No products available.
            </p>

            <div className="w-24 h-[2px] bg-[#785c3a]/30"></div>
          </motion.div>

        )}

      </section>

    </main>
  );
}