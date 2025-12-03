import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-[#fffaf6] text-gray-800">
      {/* ---------- 1️⃣ Hero Section ---------- */}
      <section className="h-screen flex items-center justify-center relative bg-white">
        <motion.img
          src="/images/newlogooo.jpg"
          alt="Brand Logo"
            className="absolute w-full h-full object-cover"
    initial={{ scale: 1.1, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/0"></div>
      </section>

      {/* ---------- 2️⃣ Signature Product Section ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 py-20 px-8 md:px-20 bg-[#faf6f1]">
        <motion.img
          src="/images/Nilabottle.jpg"
          alt="Signature Product"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          whileInView={{ x: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-brand-brown">
            Our Signature Product
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            Discover the essence of nature in every drop. Crafted with care and purity,
            our signature product redefines wellness and quality for your daily routine.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-3 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
          >
            Explore More
          </Link>
        </motion.div>
      </section>

      {/* ---------- 3️⃣ Advertisement / Banner Section ---------- */}
      <motion.section
        className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center"
        whileInView={{ scale: [1.1, 1], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img
          src="/images/banner.jpg"
          alt="Ad Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute text-center text-white z-10 px-4">
          <h2 className="text-3xl md:text-5xl font-semibold mb-3">
            Feel the Natural Difference
          </h2>
          <Link
            to="/shop"
            className="inline-block mt-3 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
          >
            Explore More
          </Link>
        </div>
      </motion.section>

      {/* ---------- 4️⃣ Footer ---------- */}
      <footer className="bg-[#f5eee7] text-center py-10 mt-10">
      
        <Link
          to="/shop"
          className="inline-block mt-4 text-brand-brown font-medium underline hover:text-brown-700 transition"
        >
          Explore More →
        </Link>
      </footer>
    </main>
  );
}



// export default function Home() {
//   return (
//     <main>
//       {/* Logo Header */}
//       <header
//         className="flex justify-center items-center bg-white"
//         style={{ height: "12.5vh" }} // top 1/8 of the viewport
//       >
//         <img
//           src="/images/logo.jpg" // place logo.jpg inside public/images/
//           alt="Lyvore Logo"
//           style={{
//             maxHeight: "100%",
//             width: "auto",
//             objectFit: "contain",
//           }}
//         />
//       </header>

//       {/* Hero Section */}
//       <section className="relative flex flex-col items-center justify-center text-center bg-lyvore-gradient py-16 px-6">
//         <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-brand-brown">
//           Welcome to LYVORE
//         </h1>
//         <p className="max-w-2xl mx-auto text-sm md:text-lg text-gray-800">
//           Luxury skincare inspired by Moroccan rituals — featuring our hero
//           ingredient, 100% pure organic Nila powder that brightens, soothes, and
//           refines your skin naturally.
//         </p>
//       </section>

//       {/* About Section */}
//       <section
//         id="about"
//         className="container-max py-12 grid gap-8 md:grid-cols-2 px-6 md:px-16"
//       >
//         <div>
//           <h2 className="text-xl sm:text-2xl font-semibold text-brand-brown">
//             What we sell
//           </h2>
//           <ul className="mt-4 list-disc ml-6 space-y-2 text-sm sm:text-base text-gray-700">
//             <li>Pure Moroccan Nila Powder (100% organic)</li>
//             <li>Face Cleanser • Brightening Serum • Nourishing Moisturizer</li>
//             <li>Body Scrub • Body Butter • Body Oil</li>
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-xl sm:text-2xl font-semibold text-brand-brown">
//             How we’re unique
//           </h2>
//           <ul className="mt-4 list-disc ml-6 space-y-2 text-sm sm:text-base text-gray-700">
//             <li>Clean INCI lists — no parabens or artificial dyes</li>
//             <li>Small-batch, ethically sourced Moroccan botanicals</li>
//             <li>Transparent formulations & recyclable packaging</li>
//             <li>Cruelty-free skincare handcrafted with care</li>
//           </ul>
//         </div>
//       </section>

//       {/* Order Section */}
//       <section className="container-max py-12 px-6 md:px-16">
//         <h2 className="text-xl sm:text-2xl font-semibold text-brand-brown">
//           How to order
//         </h2>
//         <ol className="mt-4 list-decimal ml-6 space-y-2 text-sm sm:text-base text-gray-700">
//           <li>Browse products and add to cart</li>
//           <li>Create an account or login</li>
//           <li>Checkout securely with Razorpay</li>
//           <li>Track your order from your dashboard</li>
//         </ol>
//       </section>
//     </main>
//   );
// }
