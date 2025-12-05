// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <main className="w-full overflow-x-hidden bg-[#fffaf6] text-gray-800">
//       {/* ---------- 1️⃣ Hero Section ---------- */}
//       <section className="h-screen flex items-center justify-center relative bg-white">
//         <motion.img
//           src="/images/newlogooo.jpg"
//           alt="Brand Logo"
//             className="absolute w-full h-full object-cover"
//     initial={{ scale: 1.1, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     transition={{ duration: 1.2, ease: "easeOut" }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/0"></div>
//       </section>

//       {/* ---------- 2️⃣ Signature Product Section ---------- */}
//       <section className="flex flex-col md:flex-row items-center justify-between gap-10 py-20 px-8 md:px-20 bg-[#faf6f1]">
//         <motion.img
//           src="/images/Nilabottle.jpg"
//           alt="Signature Product"
//           className="w-full md:w-1/2 rounded-2xl shadow-lg"
//           whileInView={{ y: [100, 0], opacity: [0, 1] }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true }}
//         />

//         <motion.div
//           className="w-full md:w-1/2 text-center md:text-left"
//           whileInView={{ x: [50, 0], opacity: [0, 1] }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl md:text-5xl font-bold mb-4 text-brand-brown">
//             Our Signature Product
//           </h2>
//           <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
//             Discover the essence of nature in every drop. Crafted with care and purity,
//             our signature product redefines wellness and quality for your daily routine.
//           </p>
//           <Link
//             to="/shop"
//             className="inline-block mt-3 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
//           >
//             Explore More
//           </Link>
//         </motion.div>
//       </section>

//       {/* ---------- 3️⃣ Advertisement / Banner Section ---------- */}
//       <motion.section
//         className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center"
//         whileInView={{ scale: [1.1, 1], opacity: [0, 1] }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true }}
//       >
//         <img
//           src="/images/banner.jpg"
//           alt="Ad Banner"
//           className="absolute w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/30"></div>
//         <div className="absolute text-center text-white z-10 px-4">
//           <h2 className="text-3xl md:text-5xl font-semibold mb-3">
//             Feel the Natural Difference
//           </h2>
//           <Link
//             to="/shop"
//             className="inline-block mt-3 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
//           >
//             Explore More
//           </Link>
//         </div>
//       </motion.section>

//       {/* ---------- 4️⃣ Footer ---------- */}
//       <footer className="bg-[#f5eee7] text-center py-10 mt-10">
      
//         <Link
//           to="/shop"
//           className="inline-block mt-4 text-brand-brown font-medium underline hover:text-brown-700 transition"
//         >
//           Explore More →
//         </Link>
//       </footer>
//     </main>
//   );
// }


import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="w-full bg-[#fffaf6] text-gray-800 overflow-x-hidden">

      {/* ---------- 1️⃣ HERO SECTION (Fixed mobile cropping) ---------- */}
  <section className="w-full h-screen flex items-center justify-center relative bg-white">
  <motion.img
    src="/images/newlogooo.jpg"
    alt="Brand Logo"
    className="w-full h-full object-cover"
    initial={{ scale: 1.1, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/0"></div>
</section>

      {/* ---------- 2️⃣ SIGNATURE PRODUCT SECTION ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 py-20 px-8 md:px-20 bg-[#faf6f1]">
        <motion.img
          src="/images/Nilabottle.jpg"
          alt="Signature Product"
          className="w-full md:w-1/2 rounded-2xl shadow-lg object-contain"
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

      {/* ---------- 3️⃣ RESPONSIVE VIDEO BANNER (MOBILE + DESKTOP) ---------- */}
<section className="w-full flex justify-center py-10 px-4">

  {/* Desktop Video */}
  <motion.video
    autoPlay
    loop
    muted
    playsInline
    src="/videos/bannerviddesk.mp4"
    className="
      hidden md:block
      rounded-xl
      w-[100vw] h-[65vh]
      object-cover
    "
    whileInView={{ opacity: [0, 1], y: [40, 0] }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  />

  {/* Mobile Video */}
  <motion.video
    autoPlay
    loop
    muted
    playsInline
    src="/videos/bannermob.mp4"
    className="
      block md:hidden
      rounded-xl
      w-[100vw] h-[40vh]
      object-cover
    "
    whileInView={{ opacity: [0, 1], y: [40, 0] }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  />

</section>



      {/* ---------- 4️⃣ FOOTER ---------- */}
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
