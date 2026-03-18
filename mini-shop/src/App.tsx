import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Customers from "./components/Customers";
import Slider from "./components/Slider";
import CategoryPage from "./components/CategoryPage";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import CartPage from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <div>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Products />
                <Customers />
                <Slider/>
              </>
            }
          />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          <Route path="/cart" element={<CartPage />} />
        </Routes>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
