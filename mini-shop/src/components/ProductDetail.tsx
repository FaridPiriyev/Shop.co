import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types/product";
import { useCart } from "../components/CartContext";
import {
  Heart,
  AlertCircle,
  ArrowLeft,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import { useWishlist } from "../components/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState("Olive");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const colors = [
    { label: "Olive", hex: "#4F4631" },
    { label: "Teal", hex: "#314F4A" },
    { label: "Navy", hex: "#31344F" },
  ];

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    window.scrollTo(0, 0);

    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok)
          throw new Error("Məhsul tapılmadı və ya server xətası baş verdi.");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail);

        return fetch(
          `https://dummyjson.com/products/category/${data.category}?limit=5`,
        );
      })
      .then((res) => res?.json())
      .then((resData) => {
        if (resData && resData.products) {
          setRelatedProducts(
            resData.products
              .filter((p: any) => p.id !== Number(id))
              .slice(0, 4),
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Data error:", err);
        setError(err.message);
        setLoading(false);
      });

    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "150px 20px",
          fontSize: "18px",
          color: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="animate-pulse">Loading product information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <AlertCircle
          size={64}
          color="#FF3333"
          style={{ marginBottom: "20px" }}
        />
        <h2
          style={{ fontSize: "24px", fontWeight: "800", marginBottom: "10px" }}
        >
          AN ERROR OCCURRED
        </h2>
        <p style={{ color: "rgba(0,0,0,0.6)", marginBottom: "30px" }}>
          {error}
        </p>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "black",
            color: "white",
            padding: "12px 25px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          <ArrowLeft size={20} /> Return to home page
        </Link>
      </div>
    );
  }

  if (!product) return null;

  const isMobile = windowWidth < 850;
  const displayedRelatedProducts = isMobile
    ? relatedProducts.slice(0, 2)
    : relatedProducts;
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(0)
    : product.price;

  const s = {
    container: {
      maxWidth: "1240px",
      margin: "0 auto",
      padding: isMobile ? "15px" : "20px",
      paddingBottom: "80px",
      fontFamily: "'Inter', sans-serif",
    } as React.CSSProperties,

    thumb: (isActive: boolean) =>
      ({
        width: isMobile ? "calc(33.33% - 10px)" : "120px",
        minWidth: isMobile ? "100px" : "120px",
        height: isMobile ? "100px" : "120px",
        borderRadius: "15px",
        backgroundColor: "#F0EEED",
        objectFit: "contain",
        cursor: "pointer",
        border: isActive ? "2px solid black" : "2px solid transparent",
        transition: "all 0.3s ease",
      }) as React.CSSProperties,

    mainImgWrapper: {
      flex: 1,
      backgroundColor: "#F0EEED",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: isMobile ? "300px" : "500px",
      overflow: "hidden",
    } as React.CSSProperties,

    imageBox: {
      backgroundColor: "#F0F0F0",
      borderRadius: "20px",
      padding: "20px",
      marginBottom: "15px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "250px",
    } as React.CSSProperties,

    relatedImg: (isHovered: boolean) =>
      ({
        width: "100%",
        height: "100%",
        objectFit: "contain" as const,
        transition: "transform 0.4s ease",
        transform: isHovered ? "scale(1.15)" : "scale(1)",
      }) as React.CSSProperties,

    reviewCard: {
      border: "1px solid #E6E6E6",
      borderRadius: "20px",
      padding: "28px",
      textAlign: "left",
      position: "relative",
    } as React.CSSProperties,
  };

  return (
    <div style={s.container}>
      <div
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        Home &gt; Shop &gt; {product?.category} &gt; {product?.title}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "20px" : "40px",
          marginBottom: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column-reverse" : "row",
            gap: "15px",
            flex: "1.2",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              gap: "15px",
              overflowX: isMobile ? "auto" : "visible",
            }}
          >
            {product?.images?.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={img}
                style={s.thumb(mainImage === img)}
                alt="thumb"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div style={s.mainImgWrapper}>
            <img
              key={mainImage}
              src={mainImage}
              style={{
                width: "80%",
                mixBlendMode: "multiply",
                animation: "fadeIn 0.5s ease",
              }}
              alt="main"
            />
            <style>{`
              @keyframes fadeIn { from { opacity: 0.4; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
          </div>
        </div>

        <div style={{ flex: "1" }}>
          <h1
            style={{
              fontSize: isMobile ? "32px" : "40px",
              fontWeight: "900",
              textTransform: "uppercase",
              margin: "0 0 10px 0",
              lineHeight: "1.1",
            }}
          >
            {product?.title}
          </h1>
          <div
            style={{ color: "#FFC633", fontSize: "20px", marginBottom: "20px" }}
          >
            {"★".repeat(Math.floor(product?.rating || 0))}
            <span
              style={{ color: "black", fontSize: "14px", marginLeft: "5px" }}
            >
              {product?.rating}/5
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              margin: "20px 0",
            }}
          >
            <span style={{ fontSize: "32px", fontWeight: "700" }}>
              ${product?.price}
            </span>
            <span
              style={{
                fontSize: "32px",
                color: "rgba(0,0,0,0.3)",
                textDecoration: "line-through",
              }}
            >
              ${originalPrice}
            </span>
            <span
              style={{
                backgroundColor: "#FF33331A",
                color: "#FF3333",
                padding: "6px 14px",
                borderRadius: "50px",
                fontSize: "14px",
              }}
            >
              -{Math.round(product?.discountPercentage || 0)}%
            </span>
          </div>

          <p
            style={{
              color: "rgba(0,0,0,0.6)",
              lineHeight: "1.6",
              marginBottom: "25px",
              borderBottom: "1px solid #eee",
              paddingBottom: "25px",
            }}
          >
            {product?.description}
          </p>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                color: "rgba(0,0,0,0.6)",
                fontSize: "14px",
                marginBottom: "15px",
              }}
            >
              Select Colors
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {colors.map((c) => (
                <div
                  key={c.label}
                  onClick={() => setSelectedColor(c.label)}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    backgroundColor: c.hex,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border:
                      selectedColor === c.label
                        ? "2px solid black"
                        : "1px solid transparent",
                  }}
                >
                  {selectedColor === c.label && (
                    <span style={{ color: "white" }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ borderBottom: "1px solid #eee", paddingBottom: "25px" }}
          >
            <div
              style={{
                color: "rgba(0,0,0,0.6)",
                fontSize: "14px",
                marginBottom: "15px",
              }}
            >
              Choose Size
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: "10px 25px",
                    borderRadius: "50px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor:
                      selectedSize === size ? "black" : "#F0F0F0",
                    color: selectedSize === size ? "white" : "rgba(0,0,0,0.6)",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                backgroundColor: "#F0F0F0",
                padding: "12px 25px",
                borderRadius: "50px",
              }}
            >
              <button
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                style={{
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  background: "none",
                }}
              >
                −
              </button>
              <span style={{ fontWeight: "600" }}>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  background: "none",
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                minWidth: "200px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontWeight: "600",
                cursor: "pointer",
                padding: "15px",
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => product && toggleWishlist(product)}
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50px",
                border: "1px solid #eee",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Heart
                size={24}
                fill={isInWishlist(product.id) ? "red" : "none"}
                stroke={isInWishlist(product.id) ? "red" : "black"}
              />
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #eee",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              padding: "15px 30px",
              color: "rgba(0,0,0,0.5)",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Product Details
          </div>
          <div
            style={{
              padding: "15px 30px",
              color: "black",
              fontWeight: "600",
              borderBottom: "2px solid black",
              cursor: "pointer",
            }}
          >
            Rating & Reviews
          </div>
          <div
            style={{
              padding: "15px 30px",
              color: "rgba(0,0,0,0.5)",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            FAQs
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "700" }}>
            All Reviews{" "}
            <span
              style={{
                fontSize: "14px",
                color: "rgba(0,0,0,0.5)",
                fontWeight: "400",
              }}
            >
              ({product.reviews?.length || 0})
            </span>
          </h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                backgroundColor: "#F0F0F0",
                border: "none",
                padding: "10px 15px",
                borderRadius: "50px",
                cursor: "pointer",
              }}
            >
              <SlidersHorizontal size={20} />
            </button>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "50px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Write a Review
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {product.reviews?.map((review: any, index: number) => (
            <div key={index} style={s.reviewCard}>
              <div
                style={{
                  color: "#FFC633",
                  marginBottom: "12px",
                  fontSize: "18px",
                }}
              >
                {"★".repeat(review.rating)}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontWeight: "700", fontSize: "20px" }}>
                  {review.reviewerName}
                </span>
                <div
                  style={{
                    backgroundColor: "#01AB31",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={12} color="white" strokeWidth={4} />
                </div>
              </div>
              <p
                style={{
                  color: "rgba(0,0,0,0.6)",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  fontSize: "15px",
                }}
              >
                "{review.comment}"
              </p>
              <div
                style={{
                  color: "rgba(0,0,0,0.6)",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Posted on{" "}
                {new Date(review.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  right: "28px",
                  color: "rgba(0,0,0,0.4)",
                }}
              >
                <SlidersHorizontal size={24} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <button
            style={{
              backgroundColor: "white",
              border: "1px solid #eee",
              padding: "15px 40px",
              borderRadius: "50px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Load More Reviews
          </button>
        </div>
      </div>

      <div style={{ marginTop: "80px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: isMobile ? "32px" : "40px",
            fontWeight: "900",
            marginBottom: "40px",
            textTransform: "uppercase",
          }}
        >
          You might also like
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {displayedRelatedProducts.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={{ textAlign: "left" }}>
                <div style={s.imageBox}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={s.relatedImg(hoveredId === item.id)}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "0 0 5px 0",
                  }}
                >
                  {item.title}
                </h3>
                <div style={{ color: "#FFC633", marginBottom: "5px" }}>
                  {"★".repeat(Math.floor(item.rating || 0))}
                </div>
                <div style={{ fontSize: "20px", fontWeight: "700" }}>
                  ${item.price}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
