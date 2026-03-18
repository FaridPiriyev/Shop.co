import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const hasDiscount = product.discountPercentage > 10;
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(0);

  const styles = {
    card: {
      flex: "1",
      minWidth: "250px",
      fontFamily: "Arial, sans-serif",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
    } as React.CSSProperties,
    imageWrapper: {
      backgroundColor: "#F0EEED",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      aspectRatio: "1 / 1",
      overflow: "hidden",
      marginBottom: "15px",
    } as React.CSSProperties,
    image: {
      width: "100%",
      height: "auto",
      mixBlendMode: "multiply" as any,
    } as React.CSSProperties,
    title: {
      fontSize: "18px",
      fontWeight: "700",
      margin: "10px 0 5px 0",
      color: "#000",
    } as React.CSSProperties,
    ratingRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "8px",
    } as React.CSSProperties,
    stars: {
      color: "#FFC633",
      fontSize: "18px",
    } as React.CSSProperties,
    ratingText: {
      color: "rgba(0,0,0,0.6)",
      fontSize: "14px",
    } as React.CSSProperties,
    priceRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "22px",
      fontWeight: "700",
    } as React.CSSProperties,
    oldPrice: {
      color: "rgba(0, 0, 0, 0.4)",
      textDecoration: "line-through",
      fontWeight: "400",
    } as React.CSSProperties,
    discountBadge: {
      backgroundColor: "rgba(255, 51, 51, 0.1)",
      color: "#FF3333",
      padding: "4px 12px",
      borderRadius: "50px",
      fontSize: "12px",
      fontWeight: "500",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
      <div style={styles.imageWrapper}>
        <img src={product.thumbnail} alt={product.title} style={styles.image} />
      </div>
      <h3 style={styles.title}>{product.title}</h3>
      <div style={styles.ratingRow}>
        <div style={styles.stars}>{"★".repeat(Math.floor(product.rating))}</div>
        <span style={styles.ratingText}>{product.rating}/5</span>
      </div>
      <div style={styles.priceRow}>
        <span>${product.price}</span>
        {hasDiscount && (
          <>
            <span style={styles.oldPrice}>${originalPrice}</span>
            <span style={styles.discountBadge}>
              -{Math.round(product.discountPercentage)}%
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
