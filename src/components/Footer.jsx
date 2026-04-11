import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#f5eee7] text-gray-700 py-16 mt-auto border-t border-[#e5d6c3]">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: "#785c3a" }}
        >
          LYVORE
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-500 mb-8"
        >
          Crafted for elegance. Designed for everyday luxury.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-6 text-lg mb-10"
        >
          {[FaInstagram, FaFacebook, FaWhatsapp].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-xl transition"
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-[#d6bfa3] mx-auto mb-6" />

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} LYVORE. All rights reserved.
        </p>

      </div>
    </footer>
  );
}