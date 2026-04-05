import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutUs() {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yFast = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <main ref={ref} className="text-gray-800 overflow-x-hidden">

      {/* ---------- HERO (CINEMATIC PARALLAX) ---------- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Background image (slow parallax) */}
        <motion.img
          src="/images/bg.jpg"
          alt="LYVORE skincare"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: ySlow }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <motion.div
          style={{ y: yFast }}
          className="relative z-10 text-center px-6"
        >
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Story
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-white/80 leading-relaxed">
            LYVORE blends modern skincare science with authentic Moroccan rituals,
            crafting products that elevate natural beauty through purity and precision.
          </p>
        </motion.div>

        {/* bottom fade */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
      </section>


      {/* ---------- STORY BLOCK (NO IMAGE = PREMIUM) ---------- */}
      <section className="py-28 px-6 md:px-20 text-center bg-[#faf6f1]">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-6xl mb-8"
            style={{ color: "#785c3a", fontFamily: "'Playfair Display', serif" }}
          >
            Redefining Skincare Luxury
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            We don’t follow trends — we refine traditions. LYVORE is built on the belief
            that true skincare lies in authenticity, simplicity, and uncompromising quality.
            Every formulation is intentional, minimal, and deeply rooted in heritage.
          </p>
        </motion.div>

      </section>


      {/* ---------- PRODUCT + MISSION (FLOAT + PARALLAX FEEL) ---------- */}
      <section className="grid md:grid-cols-2 items-center gap-16 py-28 px-6 md:px-20">

        <motion.img
          src="/images/ad.jpg"
          alt="Moroccan Nila"
          className="rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          whileHover={{ scale: 1.05 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-4xl font-semibold mb-6" style={{ color: "#785c3a" }}>
            Our Mission
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Clean, ethical, and effective skincare. We craft products that enhance
            your natural glow while respecting the environment and honoring tradition.
          </p>
        </motion.div>

      </section>


      {/* ---------- INGREDIENT (FOCUS SECTION) ---------- */}
      <section className="bg-[#f5eee7] py-28 px-6 md:px-20 text-center">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="uppercase tracking-widest text-sm text-[#785c3a]">
            Ingredient Spotlight
          </span>

          <h2 className="text-4xl md:text-5xl mt-3 mb-6">
            Moroccan Nila Powder
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            A rare beauty secret used for generations. Known for brightening,
            evening skin tone, and restoring natural radiance — sourced and crafted
            with purity at its core.
          </p>
        </motion.div>

      </section>


      {/* ---------- VALUES (GLASS CARDS) ---------- */}
      <section className="py-28 px-6 md:px-20">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold" style={{ color: "#785c3a" }}>
            Our Values
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            "Natural Ingredients",
            "Cruelty Free",
            "Sustainable",
            "Transparency"
          ].map((title, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">
                Built on trust, quality, and long-term impact.
              </p>
            </motion.div>
          ))}

        </div>
      </section>


      {/* ---------- CTA ---------- */}
      <section className="bg-[#785c3a] text-white py-28 text-center">

        <motion.h2
          className="text-4xl mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Discover Radiant Skin
        </motion.h2>

        <p className="opacity-80">
          Experience the power of authentic Moroccan skincare.
        </p>

        <Link
          to="/shop"
          className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>

      </section>

    </main>
  );
}