import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Customers from "./components/Customers";
import Slider from "./components/Slider";
import CategoryPage from "./components/CategoryPage";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import CartPage from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
          <div className="mx-auto w-full bg-white dark:bg-[#0a0a0a] shadow-2xl">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <Products />
                    <Customers />
                    <Slider />
                  </>
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
