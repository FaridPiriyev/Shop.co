import { useWishlist } from "../components/WishlistContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div style={{ maxWidth: "1240px", margin: "40px auto", padding: "0 20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "900", marginBottom: "30px", textTransform: "uppercase" }}>
        Your Wishlist ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Sizin wishlist hələ ki boşdur.</p>
          <Link to="/" style={{ color: "black", fontWeight: "bold", textDecoration: "underline" }}>Alış-verişə davam et</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
          {wishlist.map((item) => (
            <div key={item.id} style={{ border: "1px solid #eee", borderRadius: "20px", padding: "15px", position: "relative" }}>
              <img src={item.thumbnail} alt={item.title} style={{ width: "100%", height: "200px", objectFit: "contain", backgroundColor: "#F0EEED", borderRadius: "15px" }} />
              <h3 style={{ fontSize: "18px", margin: "15px 0 5px" }}>{item.title}</h3>
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>${item.price}</p>
              
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <Link to={`/product/${item.id}`} style={{ flex: 1, textAlign: "center", padding: "10px", backgroundColor: "black", color: "white", borderRadius: "50px", textDecoration: "none", fontSize: "14px" }}>
                  View Product
                </Link>
                <button 
                  onClick={() => toggleWishlist(item)}
                  style={{ padding: "10px", border: "1px solid #eee", borderRadius: "50px", cursor: "pointer", backgroundColor: "white" }}
                >
                  <Trash2 size={18} color="red" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;