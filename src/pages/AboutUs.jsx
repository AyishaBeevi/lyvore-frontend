import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <main className="text-gray-800">

      {/* ---------- HERO ---------- */}
     <section className="relative h-[70vh] flex items-center">

  <img
    src="/images/bg.jpg"
    alt="LYVORE skincare"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/70"></div>


        <div className="relative max-w-7xl mx-auto px-6 md:px-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Story
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed">
              LYVORE blends modern skincare science with authentic Moroccan
              beauty rituals. Our formulations use pure Moroccan Nila powder
              and carefully sourced natural ingredients to deliver radiant,
              healthy skin.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ---------- MISSION ---------- */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-2 gap-12 items-center">

        <motion.img
          src="/images/ad.jpg"
          alt="Moroccan Nila"
          className="rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-brand-brown mb-4">
            Our Mission
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            We believe skincare should be clean, ethical, and effective.
            Our mission is to create luxurious skincare products that
            enhance natural beauty using authentic ingredients and
            sustainable practices.
          </p>
        </motion.div>

      </section>


      {/* ---------- INGREDIENT SPOTLIGHT ---------- */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/nilaaa.jpg"
              alt="Moroccan Nila Powder"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <span className="uppercase tracking-widest text-sm text-brand-brown font-semibold">
              Ingredient Spotlight
            </span>

            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4">
              Moroccan Nila Powder
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Moroccan Nila is a rare beauty secret traditionally used by
              women in the Sahara region. Known for its brightening
              properties, it helps reduce pigmentation, even out skin tone,
              and enhance the skin’s natural glow.
            </p>

            <p className="text-gray-600 leading-relaxed">
              At LYVORE, we source high-quality organic Nila powder and
              craft our formulations in small batches to preserve its
              natural benefits and purity.
            </p>

          </motion.div>

        </div>
      </section>


      {/* ---------- VALUES ---------- */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-16 text-center">

          <h2 className="text-3xl font-semibold text-brand-brown mb-12">
            Our Values
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                title: "Natural Ingredients",
                desc: "We use pure Moroccan Nila and carefully selected botanical extracts."
              },
              {
                title: "Cruelty Free",
                desc: "Our products are never tested on animals."
              },
              {
                title: "Sustainable",
                desc: "Eco-friendly packaging and responsible sourcing."
              },
              {
                title: "Transparency",
                desc: "Clear ingredients and honest formulations."
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-semibold text-lg mb-2">
                  {value.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {value.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>


      {/* ---------- TRUST STATS ---------- */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-16">

          <div className="grid md:grid-cols-3 text-center gap-8">

            <div>
              <h3 className="text-4xl font-bold text-brand-brown">100%</h3>
              <p className="text-gray-600 mt-2">Natural Ingredients</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-brand-brown">Cruelty-Free</h3>
              <p className="text-gray-600 mt-2">Ethically Made</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-brand-brown">2025</h3>
              <p className="text-gray-600 mt-2">Founded</p>
            </div>

          </div>

        </div>
      </section>


      {/* ---------- FOUNDER ---------- */}
      <section className="max-w-6xl mx-auto py-20 px-6 md:px-16 text-center">

        <h2 className="text-3xl font-semibold text-brand-brown mb-12">
          Meet The Founder
        </h2>

        <div className="flex justify-center">

          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden w-[260px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >

            <img
              src="/images/girl.jpg"
              alt="Founder"
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <h3 className="font-semibold text-lg">
                Hala
              </h3>

              <p className="text-gray-500 text-sm">
                Founder of LYVORE
              </p>
            </div>

          </motion.div>

        </div>

      </section>


      {/* ---------- CTA ---------- */}
      <section className="bg-brand-brown text-white py-24 text-center">

        <h2 className="text-3xl font-semibold mb-4">
          Discover Radiant Skin
        </h2>

        <p className="text-lg opacity-90">
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