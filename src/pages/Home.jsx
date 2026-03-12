import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="w-full text-gray-800 overflow-x-hidden">

      {/* ---------- 1️⃣ HERO SECTION (Text-based Logo with Gold Gradient) ---------- */}
      <section className="w-full h-screen flex items-center justify-center relative">
        {/* Full-screen golden gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #ac8e68, #e2c29a, #785c3a)"
          }}
        ></div>

       {/* Text Logo with Gradient Fill */}
<motion.h1
  className="text-6xl md:text-9xl font-extrabold z-10 bg-gradient-to-r from-[#ac8e68] via-[#e2c29a] to-[#785c3a] bg-clip-text text-transparent"
  style={{
    fontFamily: "'Playfair Display', serif", // your luxury font
  }}
  initial={{ scale: 1.2, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
>
  LYVORE
</motion.h1>

        {/* Optional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/0"></div>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#785c3a" }}>
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
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          src="/videos/bannerviddesk.mp4"
          className="hidden md:block rounded-xl w-[100vw] h-[65vh] object-cover"
          whileInView={{ opacity: [0, 1], y: [40, 0] }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        />

        <motion.video
          autoPlay
          loop
          muted
          playsInline
          src="/videos/bannermob.mp4"
          className="block md:hidden rounded-xl w-[100vw] h-[40vh] object-cover"
          whileInView={{ opacity: [0, 1], y: [40, 0] }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        />
      </section>

      {/* ---------- 4️⃣ FOOTER ---------- */}
      <footer className="bg-[#f5eee7] text-center py-10 mt-10">
        <Link
          to="/shop"
          className="inline-block mt-4 font-medium underline transition"
          style={{ color: "#785c3a" }}
        >
          Explore More →
        </Link>
      </footer>

    </main>
  );
}