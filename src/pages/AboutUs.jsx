import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yFast = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <main ref={ref} className="text-gray-800 overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

        <motion.img
          src="/images/bg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: ySlow }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          style={{ y: yFast }}
          className="relative z-10 text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 80, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
            transition={{ duration: 1.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-white/80 leading-relaxed"
          >
            LYVORE blends modern skincare science with authentic rituals.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
      </section>


      {/* STORY */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        className="py-28 px-6 md:px-20 text-center bg-[#faf6f1]"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-6xl mb-8"
          style={{ color: "#785c3a", fontFamily: "'Playfair Display', serif" }}
        >
          Redefining Skincare Luxury
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed"
        >
          We don’t follow trends — we refine traditions. LYVORE is built on authenticity.
        </motion.p>
      </motion.section>


      {/* PRODUCT */}
      <section className="grid md:grid-cols-2 items-center gap-16 py-28 px-6 md:px-20">

        <motion.img
          src="/images/ad.jpg"
          className="rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: 0.5, y: -10 }}
          transition={{ type: "spring", stiffness: 120 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-semibold mb-6" style={{ color: "#785c3a" }}>
            Our Mission
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Clean, ethical, and effective skincare designed for modern rituals.
          </p>
        </motion.div>
      </section>


      {/* INGREDIENT */}
      <section className="relative bg-[#f5eee7] py-28 px-6 md:px-20 text-center overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(172,142,104,0.15),transparent_70%)]" />

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <span className="uppercase tracking-widest text-sm text-[#785c3a]">
            Ingredient Spotlight
          </span>

          <h2 className="text-4xl md:text-5xl mt-3 mb-6">
            Moroccan Nila Powder
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            A rare beauty secret used for generations.
          </p>
        </motion.div>
      </section>


      {/* VALUES */}
      <section className="py-28 px-6 md:px-20">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold" style={{ color: "#785c3a" }}>
            Our Values
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {["Natural", "Cruelty Free", "Sustainable", "Transparent"].map((t, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl backdrop-blur-xl bg-white/50 border border-white/20 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-sm text-gray-600">Built on trust and quality.</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="bg-[#785c3a] text-white py-28 text-center">

        <motion.h2
          className="text-4xl mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Discover Radiance, Redefined
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="opacity-80"
        >
          Experience authentic Moroccan skincare.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/shop"
            className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-full font-medium"
          >
            Shop Now
          </Link>
        </motion.div>

      </section>

    </main>
  );
}