import { useEffect, useState } from "react";
import type { Product, ProductResponse } from "../types/product";
import ProductCard from "./ProductCard";

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    fetch("https://dummyjson.com/products?limit=8")
      .then((res) => res.json())
      .then((data: ProductResponse) => setItems(data.products));

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  };


  const arrivals = isMobile ? items.slice(0, 2) : items.slice(0, 4);
  const topSelling = isMobile ? items.slice(4, 6) : items.slice(4, 8);

  return (
    <div style={containerStyle}>
      <section style={{ marginBottom: "40px" }}>
        <h2 style={titleStyle}>NEW ARRIVALS</h2>
        <div style={gridStyle}>
          {arrivals.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <button style={btnStyle}>View All</button>
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
        <div style={gridStyle}>
          {topSelling.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <button style={btnStyle}>View All</button>
      </section>
    </div>
  );
};

export default Products;
