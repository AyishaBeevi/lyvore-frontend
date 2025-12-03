import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Menu, X, ShoppingCart } from "lucide-react";
import api from "../api/axiosClient";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [bounce, setBounce] = useState(false);

  // ✅ Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Compute total items in cart
  const totalItems = items?.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Cart bounce effect
  useEffect(() => {
    if (totalItems > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  // ✅ Fetch search suggestions based on input
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) return setSuggestions([]);
      try {
        const res = await api.get(`/products?search=${encodeURIComponent(searchQuery)}`);
        setSuggestions(res.data.products || []);
      } catch (err) {
        console.error("Search error:", err);
        setSuggestions([]);
      }
    };
    const debounce = setTimeout(fetchSuggestions, 300); // debounce for 300ms
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // ✅ Navigate to product details page on selecting a suggestion
  const handleSearchSelect = (slug) => {
    navigate(`/product/${slug}`);
    setSearchQuery("");
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="container-max flex items-center justify-between h-16 px-4 md:px-8 relative">
        {/* Brand */}
        <Link to="/" className="font-semibold tracking-wider text-brand-brown text-lg">
          LYVORE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 relative">
          <NavLink to="/" className="hover:opacity-80">Home</NavLink>
          <NavLink to="/shop" className="hover:opacity-80">Shop</NavLink>
          <NavLink to="/about" className="hover:opacity-80">About Us</NavLink>
          <NavLink to="/contact" className="hover:opacity-80">Contact Us</NavLink>

          {/* ✅ Desktop Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-brand-brown"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-64 overflow-y-auto z-50">
                {suggestions.map((prod) => {
                  const regex = new RegExp(`(${searchQuery})`, "gi");
                  const parts = prod.name.split(regex);
                  return (
                    <li
                      key={prod._id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSearchSelect(prod.slug)} // ✅ slug-based navigation
                    >
                      {parts.map((part, idx) =>
                        regex.test(part) ? (
                          <span key={idx} className="font-bold">{part}</span>
                        ) : (
                          <span key={idx}>{part}</span>
                        )
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Cart */}
          <NavLink to="/cart" className="relative flex items-center" id="cart-icon">
            <ShoppingCart size={22} className="text-brand-brown hover:text-black transition-colors" />
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-3 bg-brand-brown text-white text-xs px-2 py-0.5 rounded-full transition-transform ${bounce ? "animate-bounce" : ""}`}
              >
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Auth / Profile */}
          {user ? (
            <>
              <NavLink
                to="/profile"
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
              >
                Profile
              </NavLink>
              <button
                className="px-3 py-1 rounded-md bg-brand-brown text-white text-sm"
                onClick={async () => { await logout(); }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink className="px-3 py-1 rounded-md bg-brand-brown text-white text-sm" to="/login">
              Login
            </NavLink>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t p-4 flex flex-col gap-4 relative">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="hover:opacity-80">Home</NavLink>
          <NavLink to="/shop" onClick={() => setIsOpen(false)} className="hover:opacity-80">Shop</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className="hover:opacity-80">About Us</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className="hover:opacity-80">Contact Us</NavLink>

          {/* ✅ Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-brand-brown w-full"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-64 overflow-y-auto z-50">
                {suggestions.map((prod) => {
                  const regex = new RegExp(`(${searchQuery})`, "gi");
                  const parts = prod.name.split(regex);
                  return (
                    <li
                      key={prod._id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSearchSelect(prod.slug)} // ✅ slug-based navigation
                    >
                      {parts.map((part, idx) =>
                        regex.test(part) ? (
                          <span key={idx} className="font-bold">{part}</span>
                        ) : (
                          <span key={idx}>{part}</span>
                        )
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <NavLink to="/cart" onClick={() => setIsOpen(false)} className="relative flex items-center" id="cart-icon">
            <ShoppingCart size={22} className="text-brand-brown hover:text-black transition-colors" />
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-3 bg-brand-brown text-white text-xs px-2 py-0.5 rounded-full transition-transform ${bounce ? "animate-bounce" : ""}`}
              >
                {totalItems}
              </span>
            )}
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
              >
                Profile
              </NavLink>
              <button
                className="px-3 py-2 rounded-md bg-brand-brown text-white text-sm"
                onClick={async () => { await logout(); setIsOpen(false); }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              className="px-3 py-2 rounded-md bg-brand-brown text-white text-sm"
              to="/login"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}
