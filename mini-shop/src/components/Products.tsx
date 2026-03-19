import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; 
import type { Product, ProductResponse } from "../types/product";
import ProductCard from "./ProductCard";
import { AlertCircle, RefreshCcw, Loader2 } from "lucide-react";

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => {
        if (!res.ok)
          throw new window.Error("Məhsullar gətirilərkən xəta baş verdi.");
        return res.json();
      })
      .then((data: ProductResponse) => {
        setItems(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    fetchProducts();
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchProducts]);

  const handleViewAll = () => {
    navigate("/category/all?limit=20&skip=0");
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: isMobile ? "20px 16px" : "60px 20px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? "32px" : "48px",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: isMobile ? "32px" : "40px",
    fontFamily: "Integral_CF, sans-serif",
    textTransform: "uppercase",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
    gap: isMobile ? "16px" : "20px",
    marginBottom: "24px",
  };

  const btnStyle: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    padding: "16px 54px",
    borderRadius: "62px",
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    width: isMobile ? "100%" : "auto",
    color: "#000",
    transition: "all 0.2s ease-in-out",
  };

  if (error) {
    return (
      <div
        style={{ ...containerStyle, textAlign: "center", padding: "80px 20px" }}
      >
        <AlertCircle
          size={48}
          color="#FF3333"
          style={{ margin: "0 auto 16px" }}
        />
        <h2
          style={{ fontSize: "24px", fontWeight: "800", marginBottom: "8px" }}
        >
          Xəta baş verdi
        </h2>
        <p style={{ color: "rgba(0,0,0,0.6)", marginBottom: "24px" }}>
          {error}
        </p>
        <button
          onClick={fetchProducts}
          style={{
            ...btnStyle,
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#000",
            color: "#fff",
            width: "auto",
          }}
        >
          <RefreshCcw size={18} /> Yenidən yoxla
        </button>
      </div>
    );
  }

  const arrivals = items.slice(0, 4);
  const topSelling = items.slice(4, 8);

  return (
    <div style={containerStyle}>
      <section style={{ marginBottom: "40px" }}>
        <h2 style={titleStyle}>NEW ARRIVALS</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <div style={gridStyle}>
              {arrivals.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
            <button style={btnStyle} onClick={handleViewAll}>
              View All
            </button>
          </>
        )}
      </section>

      <hr
        style={{
          border: "0",
          borderTop: "1px solid #f0f0f0",
          margin: "40px 0",
        }}
      />

      <section style={{ marginBottom: "40px" }}>
        <h2 style={titleStyle}>TOP SELLING</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <div style={gridStyle}>
              {topSelling.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
            <button style={btnStyle} onClick={handleViewAll}>
              View All
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default Products;
