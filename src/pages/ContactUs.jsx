import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("❌ Failed to send. Please try again later.");
    }
  };

  const contactInfo = [
    { title: "Email", value: "support@lyvore.com" },
    { title: "Phone", value: "+91 0123456789" },
    { title: "Website", value: "www.lyvore.com" },
  ];

  return (
    <main className="w-full overflow-x-hidden text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold text-brand-brown">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you! Fill out the form below to get in touch.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="container-max py-16 grid gap-8 md:grid-cols-3 text-center">
        {contactInfo.map((info, idx) => (
          <motion.div
            key={idx}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <h3 className="text-xl font-semibold text-brand-brown">{info.title}</h3>
            <p className="mt-2 text-gray-600">{info.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="container-max py-16">
        {!submitted ? (
          <motion.div
            className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold text-brand-brown text-center">
              Send Us a Message
            </h2>
            <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brown"
                required
              />
              <button
                type="submit"
                className="bg-brand-brown text-black py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Send Message
              </button>
              {error && (
                <p className="text-center text-red-500 text-sm mt-2">{error}</p>
              )}
            </form>
          </motion.div>
        ) : (
          <motion.div
            className="max-w-2xl mx-auto text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-brand-brown mb-4"> Thank You!</h2>
            <p className="text-gray-600">
              Your message has been received. We’ll get back to you soon!
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
