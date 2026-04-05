import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {

  const heroRef = useRef(null);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

  return (
    <main className="w-full text-gray-800 overflow-x-hidden">

      {/* ---------- 1️⃣ HERO (REAL PARALLAX + DEPTH) ---------- */}
      <section ref={heroRef} className="w-full h-screen relative overflow-hidden">

        {/* Background layer */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(135deg, #ac8e68, #e2c29a, #785c3a)"
            }}
          />
        </motion.div>

        {/* Glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.25),transparent_60%)]" />

        {/* Text layer */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          <motion.h1
            className="text-6xl md:text-[10rem] font-extrabold tracking-wider bg-gradient-to-r from-[#ac8e68] via-[#f5e2c5] to-[#785c3a] bg-clip-text text-transparent drop-shadow-xl"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            LYVORE
          </motion.h1>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>


      {/* ---------- 2️⃣ SIGNATURE PRODUCT (FLOATING + PREMIUM) ---------- */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-16 py-28 px-8 md:px-24 bg-[#faf6f1]">

        {/* Image */}
        <motion.img
          src="/images/Nilabottle.jpg"
          alt="Signature Product"
          className="w-full md:w-1/2 rounded-3xl shadow-2xl object-contain"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
        />

        {/* Text */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: "#785c3a" }}
          >
            Signature Luxury
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-lg">
            Crafted with precision and purity, this isn’t just a product — it’s a statement.
            Designed for those who demand elegance in everyday essentials.
          </p>

          <Link
            to="/shop"
            className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-all shadow-lg"
          >
            Explore Collection
          </Link>
        </motion.div>
      </section>


      {/* ---------- 3️⃣ VIDEO (CINEMATIC SECTION) ---------- */}
      <section className="relative w-full flex justify-center py-20 px-4 bg-white">

        {/* subtle parallax container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl"
        >
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            src="/videos/bannerviddesk.mp4"
            className="hidden md:block rounded-2xl w-full h-[70vh] object-cover shadow-2xl"
          />

          <motion.video
            autoPlay
            loop
            muted
            playsInline
            src="/videos/bannermob.mp4"
            className="block md:hidden rounded-2xl w-full h-[45vh] object-cover shadow-2xl"
          />
        </motion.div>

      </section>


      {/* ---------- 4️⃣ FOOTER (MINIMAL LUXURY) ---------- */}
      <footer className="bg-[#f5eee7] text-center py-14 mt-10">
        <Link
          to="/shop"
          className="inline-block text-lg font-medium underline hover:opacity-70 transition"
          style={{ color: "#785c3a" }}
        >
          Explore More →
        </Link>
      </footer>

    </main>
  );
}