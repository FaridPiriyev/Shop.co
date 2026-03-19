import { useEffect, useState, useCallback, useRef } from "react";
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

  const arrivalsRef = useRef<HTMLDivElement>(null);
  const topSellingRef = useRef<HTMLDivElement>(null);
  const [arrivalsIndex, setArrivalsIndex] = useState(0);
  const [topSellingIndex, setTopSellingIndex] = useState(0);

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

  const handleSliderScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setIndex: (i: number) => void,
    total: number,
  ) => {
    const el = ref.current;
    if (!el) return;
    const scrollPos = el.scrollLeft;
    const itemWidth = el.scrollWidth / total;
    const newIndex = Math.round(scrollPos / itemWidth);
    setIndex(newIndex);
  };

  const scrollToIndex = (
    ref: React.RefObject<HTMLDivElement | null>,
    index: number,
    total: number,
  ) => {
    const el = ref.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: (maxScroll / (total - 1)) * index,
      behavior: "smooth",
    });
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
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "24px",
  };

  const sliderWrapperStyle: React.CSSProperties = {
    display: "flex",
    overflowX: "auto",
    gap: "16px",
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    marginBottom: "16px",
    paddingBottom: "4px",
  };

  const sliderCardStyle: React.CSSProperties = {
    flex: "0 0 calc(50% - 8px)",
    scrollSnapAlign: "start",
  };

  const dotsContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "6px",
    marginBottom: "20px",
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

  const renderSection = (
    title: string,
    products: Product[],
    sliderRef: React.RefObject<HTMLDivElement | null>,
    activeIndex: number,
    setIndex: (i: number) => void,
  ) => (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={titleStyle}>{title}</h2>
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" />
        </div>
      ) : isMobile ? (
        <>
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          <div
            ref={sliderRef}
            className="no-scrollbar"
            style={sliderWrapperStyle}
            onScroll={() =>
              handleSliderScroll(sliderRef, setIndex, products.length)
            }
          >
            {products.map((item) => (
              <div key={item.id} style={sliderCardStyle}>
                <ProductCard product={item} />
              </div>
            ))}
          </div>
          <button style={btnStyle} onClick={handleViewAll}>
            View All
          </button>
        </>
      ) : (
        <>
          <div style={gridStyle}>
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          <button style={btnStyle} onClick={handleViewAll}>
            View All
          </button>
        </>
      )}
    </section>
  );

  return (
    <div style={containerStyle}>
      {renderSection(
        "NEW ARRIVALS",
        arrivals,
        arrivalsRef,
        arrivalsIndex,
        setArrivalsIndex,
      )}

      <hr
        style={{
          border: "0",
          borderTop: "1px solid #f0f0f0",
          margin: "40px 0",
        }}
      />

      {renderSection(
        "TOP SELLING",
        topSelling,
        topSellingRef,
        topSellingIndex,
        setTopSellingIndex,
      )}
    </div>
  );
};

export default Products;
