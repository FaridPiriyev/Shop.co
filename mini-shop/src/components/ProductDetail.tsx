import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/product";
import { useCart } from "../components/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        quantity: quantity,
        size: selectedSize,
        color: "Black",
      });
      alert(`${product.title} səbətə əlavə edildi!`);
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Əgər API-dan xəta mesajı gəlsə (məsələn product tapılmasa) setProduct-u null saxla
        if (data.message) {
          console.error("Məhsul tapılmadı:", data.message);
        } else {
          setProduct(data);
        }
      })
      .catch((err) => console.error("Data gətirilərkən xəta:", err));

    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  // Əgər product yoxdursa və ya daxilində başlıq hələ yoxdursa yükləmə ekranı göstər
  if (!product || !product.title) {
    return (
      <div style={{ textAlign: "center", padding: "100px", fontSize: "20px" }}>
        Məhsul yüklənir...
      </div>
    );
  }

  const isMobile = windowWidth < 850;

  // Endirimli qiymət hesablama (Ehtiyat üçün 0-a bölünməni yoxlayırıq)
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(0)
    : product.price;

  const s = {
    container: {
      maxWidth: "1240px",
      margin: "0 auto",
      padding: isMobile ? "15px" : "20px",
      fontFamily: "'Inter', sans-serif",
    } as React.CSSProperties,

    breadcrumb: {
      color: "rgba(0,0,0,0.5)",
      fontSize: "14px",
      marginBottom: "20px",
    },

    mainRow: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "20px" : "40px",
      marginBottom: "60px",
    } as React.CSSProperties,

    imagesCol: {
      display: "flex",
      flexDirection: isMobile ? "column-reverse" : "row",
      gap: "15px",
      flex: "1.2",
    } as React.CSSProperties,

    sideThumbs: {
      display: "flex",
      flexDirection: isMobile ? "row" : "column",
      gap: "15px",
      overflowX: isMobile ? "auto" : "visible",
    } as React.CSSProperties,

    thumb: {
      width: isMobile ? "calc(33.33% - 10px)" : "120px",
      minWidth: isMobile ? "100px" : "120px",
      height: isMobile ? "100px" : "120px",
      borderRadius: "15px",
      backgroundColor: "#F0EEED",
      objectFit: "contain",
      cursor: "pointer",
    } as React.CSSProperties,

    mainImgWrapper: {
      flex: 1,
      backgroundColor: "#F0EEED",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: isMobile ? "300px" : "auto",
    } as React.CSSProperties,

    infoCol: { flex: "1" },

    title: {
      fontSize: isMobile ? "32px" : "40px",
      fontWeight: "900",
      textTransform: "uppercase",
      margin: "0 0 10px 0",
      lineHeight: "1.1",
    } as React.CSSProperties,

    priceRow: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      margin: "20px 0",
    },

    reviewGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "20px",
    } as React.CSSProperties,

    tabItem: (active: boolean) =>
      ({
        flex: 1,
        padding: "15px",
        cursor: "pointer",
        borderBottom: active ? "2px solid black" : "1px solid #eee",
        color: active ? "black" : "rgba(0,0,0,0.5)",
        fontWeight: active ? "600" : "400",
        textAlign: "center",
      }) as React.CSSProperties,
  };

  return (
    <div style={s.container}>
      <div style={s.breadcrumb}>
        Home &gt; Shop &gt; {product?.category} &gt; {product?.title}
      </div>

      <div style={s.mainRow}>
        <div style={s.imagesCol}>
          <div style={s.sideThumbs}>
            {product?.images?.slice(0, 3).map((img, i) => (
              <img key={i} src={img} style={s.thumb} alt="thumb" />
            ))}
          </div>
          <div style={s.mainImgWrapper}>
            <img
              src={product?.thumbnail}
              style={{ width: "80%", mixBlendMode: "multiply" }}
              alt="main"
            />
          </div>
        </div>

        <div style={s.infoCol}>
          <h1 style={s.title}>{product?.title}</h1>
          <div style={{ color: "#FFC633", fontSize: "20px" }}>
            {"★".repeat(Math.floor(product?.rating || 0))}
            <span
              style={{ color: "black", fontSize: "14px", marginLeft: "5px" }}
            >
              {product?.rating}/5
            </span>
          </div>

          <div style={s.priceRow}>
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
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#4F4631",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid black",
                }}
              >
                <span style={{ color: "white" }}>✓</span>
              </div>
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#314F4A",
                  cursor: "pointer",
                }}
              ></div>
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#31344F",
                  cursor: "pointer",
                }}
              ></div>
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
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
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
                onClick={() => setQuantity((prev) => prev + 1)}
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
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #eee",
          marginBottom: "30px",
        }}
      >
        <div style={s.tabItem(false)}>Product Details</div>
        <div style={s.tabItem(true)}>Rating & Reviews</div>
        <div style={s.tabItem(false)}>FAQs</div>
      </div>

      <div style={s.reviewGrid}>
        {product?.reviews?.map((rev, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #eee",
              padding: "25px",
              borderRadius: "20px",
            }}
          >
            <div style={{ color: "#FFC633", marginBottom: "10px" }}>
              {"★".repeat(rev.rating || 0)}
            </div>
            <div
              style={{
                fontWeight: "700",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {rev.reviewerName} <span style={{ color: "#01AB31" }}>✔</span>
            </div>
            <p
              style={{
                color: "rgba(0,0,0,0.6)",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              "{rev.comment}"
            </p>
            <div
              style={{
                marginTop: "20px",
                color: "rgba(0,0,0,0.4)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Posted on{" "}
              {new Date(rev.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
