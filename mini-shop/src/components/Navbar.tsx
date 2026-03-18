import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  CircleUser,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-[#000000] text-[#FFFFFF] relative flex items-center justify-center font-['Satoshi'] 
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden
        ${isBannerVisible ? "h-[38px] opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-full"}`}
      >
        <div className="flex items-center justify-center w-full px-4">
          <p className="text-[14px] sm:text-sm text-center">
            Sign up and get 20% off to your first order.{" "}
            <button className="underline font-medium hover:text-gray-300 transition-colors cursor-pointer">
              Sign Up Now
            </button>
          </p>
          <button
            onClick={() => setIsBannerVisible(false)}
            className="absolute right-4 sm:right-24 hover:rotate-90 transition-transform duration-300 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <nav className="relative w-full bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 py-5 sm:px-6 lg:px-20 flex items-center justify-between gap-4 md:gap-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-[32px] md:text-3xl tracking-tighter uppercase font-extrabold font-['Integral_CF',sans-serif]">
              SHOP.CO
            </h1>
          </div>

          <ul className="hidden lg:flex items-center gap-6 text-base font-['Satoshi']">
            <li className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
              Shop <ChevronDown size={16} />
            </li>
            <li className="cursor-pointer hover:opacity-70">On Sale</li>
            <li className="cursor-pointer whitespace-nowrap hover:opacity-70">
              New Arrivals
            </li>
            <li className="cursor-pointer hover:opacity-70">Brands</li>
          </ul>

          <div className="hidden md:flex flex-1 items-center bg-[#F0F0F0] rounded-full px-4 py-3 gap-3">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent border-none outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="md:hidden cursor-pointer">
              <Search className="w-6 h-6" />
            </button>
            <button className="cursor-pointer">
              <Link to="/cart" className="cursor-pointer">
                <ShoppingCart className="w-6 h-6" />
              </Link>
            </button>
            <button className="cursor-pointer">
              <CircleUser className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed left-0 top-0 h-full w-[250px] bg-white p-6 transition-transform duration-500 ease-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black">SHOP.CO</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-6 text-lg font-medium">
              <li className="flex justify-between items-center">
                Shop <ChevronDown size={18} />
              </li>
              <li>On Sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
