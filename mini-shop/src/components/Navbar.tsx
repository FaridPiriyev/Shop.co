import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  CircleUser,
  Menu,
  X,
  ChevronDown,
  Heart,
  Moon,
  Sun,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../components/WishlistContext";
import { useCart } from "../components/CartContext";

interface SearchProduct {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

function Navbar() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [showResults, setShowResults] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
          .then((res) => {
            if (!res.ok)
              throw new Error("Axtarış nəticələri gətirilə bilmədi.");
            return res.json();
          })
          .then((data) => {
            setSearchResults(data.products.slice(0, 5));
            setShowResults(true);
          })
          .catch((err) => {
            console.error("Axtarış xətası:", err.message);
            setSearchResults([]);
            setShowResults(false);
          });
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectProduct = (id: number) => {
    setSearchQuery(""); 
    setShowResults(false);
    setIsMobileSearchOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div
        className={`bg-[#000000] text-[#FFFFFF] dark:bg-white dark:text-black relative flex items-center justify-center font-['Satoshi'] 
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden 
        ${isBannerVisible ? "h-[38px] opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-full"}`}
      >
        <div className="flex items-center justify-center w-full px-4 text-center">
          <p className="text-[12px] sm:text-sm">
            Sign up and get 20% off to your first order.{" "}
            <button className="underline font-medium hover:text-gray-300 transition-colors cursor-pointer">
              Sign Up Now
            </button>
          </p>
          <button
            onClick={() => setIsBannerVisible(false)}
            className="absolute right-4 sm:right-8 lg:right-20 hover:rotate-90 transition-transform duration-300 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <nav className="w-full bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-4 py-5 flex items-center justify-between gap-4 md:gap-10">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden cursor-pointer dark:text-white"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              to="/"
              className="text-[28px] md:text-3xl tracking-tighter uppercase font-extrabold font-['Integral_CF',sans-serif] leading-none text-[#000000] dark:text-white"
            >
              SHOP.CO
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-6 text-base font-['Satoshi'] text-black dark:text-white">
            <li className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
              Shop <ChevronDown size={16} />
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-opacity">
              On Sale
            </li>
            <li className="cursor-pointer whitespace-nowrap hover:opacity-70 transition-opacity">
              New Arrivals
            </li>
            <li className="cursor-pointer hover:opacity-70 transition-opacity">
              Brands
            </li>
          </ul>

          <div className="hidden lg:flex flex-1 items-center bg-[#F0F0F0] dark:bg-gray-800 rounded-full px-4 py-3 gap-3 relative">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              onFocus={() => searchQuery.length > 1 && setShowResults(true)}
            />

            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mt-2 rounded-xl shadow-lg overflow-hidden z-50">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black dark:text-white truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-full dark:text-white"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>

            <button
              className="lg:hidden cursor-pointer dark:text-white"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="w-6 h-6" />
            </button>

            <Link
              to="/wishlist"
              className="relative cursor-pointer hover:opacity-70 transition-opacity dark:text-white"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative cursor-pointer hover:opacity-70 transition-opacity dark:text-white"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black dark:bg-white dark:text-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="cursor-pointer hover:opacity-70 transition-opacity dark:text-white">
              <CircleUser className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div className="lg:hidden px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center bg-[#F0F0F0] dark:bg-gray-800 rounded-full px-4 py-3 gap-3 relative">
              <Search className="text-gray-400 w-5 h-5" />
              <input
                type="text"
                autoFocus
                placeholder="Search for products..."
                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
              />
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mt-2 rounded-xl shadow-lg overflow-hidden z-50">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black dark:text-white truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed left-0 top-0 h-full w-[280px] bg-white dark:bg-gray-900 p-6 transition-transform duration-500 ease-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-black dark:text-white">
                SHOP.CO
              </h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-7 h-7 text-black dark:text-white" />
              </button>
            </div>
            <ul className="flex flex-col gap-6 text-xl font-bold text-black dark:text-white">
              <li className="flex justify-between items-center border-b dark:border-gray-700 pb-2">
                Shop <ChevronDown size={20} />
              </li>
              <li className="border-b dark:border-gray-700 pb-2">On Sale</li>
              <li className="border-b dark:border-gray-700 pb-2">
                New Arrivals
              </li>
              <li className="border-b dark:border-gray-700 pb-2">Brands</li>
              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="border-b dark:border-gray-700 pb-2 flex justify-between"
              >
                Wishlist <span>({wishlist.length})</span>
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="border-b dark:border-gray-700 pb-2 flex justify-between"
              >
                Cart <span>({cartCount})</span>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
