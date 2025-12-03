import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-3">
        {/* Branding */}
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} <span className="font-semibold text-white">ay</span>. All Rights Reserved.
        </p>

        {/* Social Links */}
        <div className="flex space-x-5 text-xl">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://wa.me/yourwhatsapplink"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 transition-colors"
          >
            <FaWhatsapp />
          </a>
        </div>

        {/* Tagline */}
        <p className="text-xs text-gray-400">
          Built with ❤️ by the <span className="font-medium text-white">LYVORE Team</span>
        </p>
      </div>
    </footer>
  );
}
