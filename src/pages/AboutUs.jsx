import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <main className="text-gray-800">

      {/* ---------- Hero Section ---------- */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        {/* <img
          src="/images/about-hero.jpg"
          alt="About LYVORE"
          className="absolute w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.div
          className="relative max-w-5xl text-center md:text-left px-6 md:px-16 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            About LYVORE
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl">
            At LYVORE, we combine luxury skincare with time-honored Moroccan
            rituals. Our products are crafted with 100% organic Moroccan Nila
            powder, designed to brighten, soothe, and refine your skin naturally.
          </p>
        </motion.div>
      </section>

      {/* ---------- Our Mission Section ---------- */}
      <section className="max-w-5xl mx-auto py-16 px-6 md:px-16 text-center md:text-left">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-brand-brown mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          className="text-gray-700 text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We aim to provide clean, ethical, and effective skincare that empowers
          people to feel confident and radiant in their natural skin. Every product
          is thoughtfully created with transparency and care.
        </motion.p>
      </section>

      {/* ---------- Our Story & Values Section ---------- */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-16 grid gap-12 md:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-brown mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Founded in 2025, LYVORE started with a passion for authentic Moroccan
            beauty rituals. From small-batch formulations to ethically sourced
            ingredients, we focus on creating skincare that truly nourishes the skin
            without compromising on sustainability or ethics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-brown mb-4">
            Our Values
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 text-base md:text-lg">
            <li>100% Natural & Organic Ingredients</li>
            <li>Cruelty-Free & Ethically Sourced</li>
            <li>Sustainable & Recyclable Packaging</li>
            <li>Transparent Formulations</li>
          </ul>
        </motion.div>
      </section>

      {/* ---------- Meet the Team Section ---------- */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-16 text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-brand-brown mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Meet the Team
        </motion.h2>
        <motion.p
          className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our passionate team of skincare enthusiasts ensures that every product is
          crafted with love, care, and the highest standards of quality.
        </motion.p>

        {/* Optional: Team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Example team member */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src="/images/girl.jpg" alt="Team Member" className="w-full h-56 object-cover"/>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Aysha</h3>
              <p className="text-gray-600 text-sm">Founder & CEO</p>
            </div>
          </motion.div>

          {/* Repeat similar cards for other members */}
        </div>
      </section>

      {/* ---------- Call-to-Action Section ---------- */}
      <section className="bg-brand-brown text-white py-20 text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to experience luxury skincare?
        </motion.h2>
        <motion.p
          className="mt-4 text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Browse our collection and find your perfect skincare ritual.
        </motion.p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-white text-black py-3 px-8 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </section>

    </main>
  );
}
