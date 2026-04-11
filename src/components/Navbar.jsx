
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

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const totalItems = items?.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    if (totalItems > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

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
    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearchSelect = (slug) => {
    navigate(`/product/${slug}`);
    setSearchQuery("");
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-[#e5d6c3] shadow-[0_4px_30px_rgba(0,0,0,0.05)]">

  <div className="container-max flex items-center justify-between h-20 px-4 md:px-8 relative">

    {/* BRAND */}
    <Link
      to="/"
      className="text-xl tracking-[0.2em] font-semibold"
      style={{ fontFamily: "'Playfair Display', serif", color: "#785c3a" }}
    >
      LYVORE
    </Link>

    {/* DESKTOP NAV */}
    <nav className="hidden md:flex items-center gap-8 relative">

      {[ 
        { to: "/", label: "Home" },
        { to: "/shop", label: "Shop" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" }
      ].map((link, i) => (
        <NavLink
          key={i}
          to={link.to}
          className="relative text-sm tracking-wide text-gray-700 hover:text-black transition"
        >
          {link.label}

          {/* underline animation */}
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#785c3a] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
      ))}

      {/* SEARCH */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-[#e5d6c3] text-sm focus:outline-none focus:ring-1 focus:ring-[#785c3a] w-48 transition-all focus:w-64"
        />

        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-[#e5d6c3] rounded-xl shadow-xl max-h-64 overflow-y-auto z-50 mt-2">
            {suggestions.map((prod) => {
              const regex = new RegExp(`(${searchQuery})`, "gi");
              const parts = prod.name.split(regex);

              return (
                <li
                  key={prod._id}
                  className="px-4 py-2 hover:bg-[#faf6f1] cursor-pointer"
                  onClick={() => handleSearchSelect(prod.slug)}
                >
                  {parts.map((part, idx) =>
                    regex.test(part)
                      ? <span key={idx} className="font-semibold text-[#785c3a]">{part}</span>
                      : <span key={idx}>{part}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* CART */}
      <NavLink to="/cart" className="relative flex items-center">
        <ShoppingCart size={22} className="text-[#785c3a] hover:scale-110 transition" />
        {totalItems > 0 && (
          <span
            className={`absolute -top-2 -right-3 bg-[#785c3a] text-white text-xs px-2 py-0.5 rounded-full shadow-md ${bounce ? "animate-bounce" : ""}`}
          >
            {totalItems}
          </span>
        )}
      </NavLink>

      {/* AUTH */}
      {user ? (
        <>
          <NavLink className="text-sm hover:text-black transition" to="/profile">
            Profile
          </NavLink>

          <button
            className="px-4 py-2 rounded-full bg-[#785c3a] text-white text-sm hover:scale-105 transition"
            onClick={async () => { await logout(); }}
          >
            Logout
          </button>
        </>
      ) : (
        <NavLink
          className="px-4 py-2 rounded-full bg-[#785c3a] text-white text-sm hover:scale-105 transition"
          to="/login"
        >
          Login
        </NavLink>
      )}
    </nav>

    {/* MOBILE */}
    <div className="flex items-center gap-4 md:hidden">

      <NavLink to="/cart" className="relative flex items-center">
        <ShoppingCart size={22} className="text-[#785c3a]" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-[#785c3a] text-white text-xs px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        )}
      </NavLink>

      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

  </div>

  {/* MOBILE MENU */}
  {isOpen && (
    <div className="md:hidden bg-white/90 backdrop-blur-xl border-t p-6 flex flex-col gap-5">

      {["/", "/shop", "/about", "/contact"].map((path, i) => (
        <NavLink key={i} to={path} onClick={() => setIsOpen(false)}>
          {["Home","Shop","About","Contact"][i]}
        </NavLink>
      ))}

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 rounded-full border border-[#e5d6c3]"
      />

      {user ? (
        <>
          <NavLink to="/profile" onClick={() => setIsOpen(false)}>
            Profile
          </NavLink>
          <button onClick={async () => { await logout(); setIsOpen(false); }}>
            Logout
          </button>
        </>
      ) : (
        <NavLink to="/login" onClick={() => setIsOpen(false)}>
          Login
        </NavLink>
      )}

    </div>
  )}
</header>
  );
}
