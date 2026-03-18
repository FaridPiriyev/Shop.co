import { useEffect, useState } from "react";
import type { Product, ProductResponse } from "../types/product";
import ProductCard from "./ProductCard";

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then((res) => res.json())
      .then((data: ProductResponse) => setItems(data.products));
  }, []);

  const containerStyle: React.CSSProperties = {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "60px 20px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "40px",
    fontFamily: "Integral_CF, sans-serif", 
  };

  const gridStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "space-between",
  };

  const btnStyle: React.CSSProperties = {
    display: "block",
    margin: "30px auto 60px auto",
    padding: "15px 60px",
    borderRadius: "50px",
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <section>
        <h2 style={titleStyle}>NEW ARRIVALS</h2>
        <div style={gridStyle}>
          {items.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <button style={btnStyle}>View All</button>
      </section>

      <hr
        style={{ border: "0", borderTop: "1px solid #eee", margin: "40px 0" }}
      />

      <section>
        <h2 style={titleStyle}>TOP SELLING</h2>
        <div style={gridStyle}>
          {items.slice(4, 8).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <button style={btnStyle}>View All</button>
      </section>
    </div>
  );
};

export default Products;
