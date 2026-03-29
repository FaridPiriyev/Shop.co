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
      <div className="text-center py-[150px] px-5 text-[18px] text-black/50 dark:text-white/50">
        <div className="animate-pulse">Loading product information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-[100px] px-5 text-center">
        <AlertCircle size={64} className="text-[#FF3333] mb-5" />
        <h2 className="text-2xl font-extrabold mb-2.5 dark:text-white">
          AN ERROR OCCURRED
        </h2>
        <p className="text-black/60 dark:text-white/60 mb-[30px]">{error}</p>
        <Link
          to="/"
          className="flex items-center gap-2.5 bg-black dark:bg-white dark:text-black text-white py-3 px-[25px] rounded-full no-underline font-semibold transition-opacity hover:opacity-80"
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

  return (
    <div className="max-w-[1240px] mx-auto p-4 md:p-5 pb-20 font-['Inter',sans-serif]">
      <div className="text-black/50 dark:text-white/50 text-sm mb-5">
        Home &gt; Shop &gt; {product?.category} &gt; {product?.title}
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-10 mb-[60px]">
        <div className="flex flex-col-reverse md:flex-row gap-[15px] flex-[1.2]">
          <div className="flex flex-row md:flex-col gap-[15px] overflow-x-auto md:overflow-y-auto shrink-0">
            {product?.images?.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
                className={`w-[calc(33.33%-10px)] min-w-[100px] md:w-[120px] md:min-w-[120px] h-[100px] md:h-[120px] rounded-[15px] bg-[#F0EEED] dark:bg-zinc-800 object-contain cursor-pointer transition-all duration-300 border-2 ${
                  mainImage === img
                    ? "border-black dark:border-white"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
          <div className="flex-1 bg-[#F0EEED] dark:bg-zinc-800 rounded-[20px] flex items-center justify-center min-h-[300px] md:min-h-[500px] overflow-hidden">
            <img
              key={mainImage}
              src={mainImage}
              alt="main"
              className="w-[80%] mix-blend-multiply dark:mix-blend-normal animate-[fadeIn_0.5s_ease]"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-[32px] md:text-[40px] font-black uppercase mb-2.5 leading-[1.1] dark:text-white">
            {product?.title}
          </h1>

          <div className="text-[#FFC633] text-xl mb-5">
            {"★".repeat(Math.floor(product?.rating || 0))}
            <span className="text-black dark:text-white/70 text-sm ml-[5px]">
              {product?.rating}/5
            </span>
          </div>

          <div className="flex items-center gap-[15px] my-5">
            <span className="text-[32px] font-bold dark:text-white">
              ${product?.price}
            </span>
            <span className="text-[32px] text-black/30 dark:text-white/30 line-through">
              ${originalPrice}
            </span>
            <span className="bg-[#FF33331A] text-[#FF3333] py-1.5 px-3.5 rounded-full text-sm">
              -{Math.round(product?.discountPercentage || 0)}%
            </span>
          </div>

          <p className="text-black/60 dark:text-white/60 leading-relaxed mb-[25px] border-b border-[#eee] dark:border-zinc-800 pb-[25px]">
            {product?.description}
          </p>
          <div className="mb-5">
            <div className="text-black/60 dark:text-white/60 text-sm mb-[15px]">
              Select Colors
            </div>
            <div className="flex gap-3">
              {colors.map((c) => (
                <div
                  key={c.label}
                  onClick={() => setSelectedColor(c.label)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-[35px] h-[35px] rounded-full cursor-pointer flex items-center justify-center border-2 ${
                    selectedColor === c.label
                      ? "border-black dark:border-white"
                      : "border-transparent"
                  }`}
                >
                  {selectedColor === c.label && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-b border-[#eee] dark:border-zinc-800 pb-[25px]">
            <div className="text-black/60 dark:text-white/60 text-sm mb-[15px]">
              Choose Size
            </div>
            <div className="flex gap-2.5 flex-wrap">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 px-[25px] rounded-full border-none cursor-pointer transition-colors ${
                    selectedSize === size
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-[#F0F0F0] dark:bg-zinc-800 text-black/60 dark:text-white/60"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-5 mt-[30px] flex-wrap">
            <div className="flex items-center gap-5 bg-[#F0F0F0] dark:bg-zinc-800 py-3 px-[25px] rounded-full">
              <button
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                className="border-none cursor-pointer text-xl bg-transparent dark:text-white"
              >
                −
              </button>
              <span className="font-semibold dark:text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="border-none cursor-pointer text-xl bg-transparent dark:text-white"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-[200px] bg-black dark:bg-white dark:text-black text-white border-none rounded-full font-semibold cursor-pointer p-[15px] transition-opacity hover:opacity-90"
            >
              Add to Cart
            </button>
            <button
              onClick={() => product && toggleWishlist(product)}
              className="w-[55px] h-[55px] rounded-full border border-[#eee] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Heart
                size={24}
                fill={isInWishlist(product.id) ? "red" : "none"}
                stroke={isInWishlist(product.id) ? "red" : "currentColor"}
                className={
                  isInWishlist(product.id) ? "" : "text-black dark:text-white"
                }
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[50px]">
        <div className="flex border-b border-[#eee] dark:border-zinc-800 mb-[30px]">
          <div className="py-[15px] px-[30px] text-black/50 dark:text-white/50 font-medium cursor-pointer">
            Product Details
          </div>
          <div className="py-[15px] px-[30px] text-black dark:text-white font-semibold border-b-2 border-black dark:border-white cursor-pointer">
            Rating & Reviews
          </div>
          <div className="py-[15px] px-[30px] text-black/50 dark:text-white/50 font-medium cursor-pointer">
            FAQs
          </div>
        </div>

        <div className="flex justify-between items-center mb-[25px]">
          <h2 className="text-2xl font-bold dark:text-white">
            All Reviews{" "}
            <span className="text-sm text-black/50 dark:text-white/50 font-normal">
              ({product.reviews?.length || 0})
            </span>
          </h2>
          <div className="flex gap-2.5">
            <button className="bg-[#F0F0F0] dark:bg-zinc-800 border-none p-2.5 px-[15px] rounded-full cursor-pointer dark:text-white">
              <SlidersHorizontal size={20} />
            </button>
            <button className="bg-black dark:bg-white text-white dark:text-black border-none py-3 px-[25px] rounded-full font-semibold cursor-pointer">
              Write a Review
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {product.reviews?.map((review: any, index: number) => (
            <div
              key={index}
              className="border border-[#E6E6E6] dark:border-zinc-800 rounded-[20px] p-7 text-left relative bg-white dark:bg-zinc-900/50"
            >
              <div className="text-[#FFC633] mb-3 text-[18px]">
                {"★".repeat(review.rating)}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-xl dark:text-white">
                  {review.reviewerName}
                </span>
                <div className="bg-[#01AB31] rounded-full w-[18px] h-[18px] flex items-center justify-center">
                  <Check size={12} color="white" strokeWidth={4} />
                </div>
              </div>
              <p className="text-black/60 dark:text-white/60 leading-relaxed mb-5 text-[15px]">
                "{review.comment}"
              </p>
              <div className="text-black/60 dark:text-white/60 text-sm font-medium">
                Posted on{" "}
                {new Date(review.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="absolute top-7 right-7 text-black/40 dark:text-white/30">
                <SlidersHorizontal size={24} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-20">
          <button className="bg-white dark:bg-zinc-900 border border-[#eee] dark:border-zinc-800 py-[15px] px-10 rounded-full font-semibold cursor-pointer dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            Load More Reviews
          </button>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-[32px] md:text-[40px] font-black mb-10 uppercase dark:text-white">
          You might also like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {displayedRelatedProducts.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="no-underline color-inherit block"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="text-left">
                <div className="bg-[#F0F0F0] dark:bg-zinc-800 rounded-[20px] p-5 mb-[15px] overflow-hidden flex items-center justify-center h-[250px]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={`w-full h-full object-contain transition-transform duration-400 ${
                      hoveredId === item.id ? "scale-[1.15]" : "scale-100"
                    }`}
                  />
                </div>
                <h3 className="text-[18px] font-bold mb-1 dark:text-white">
                  {item.title}
                </h3>
                <div className="text-[#FFC633] mb-1">
                  {"★".repeat(Math.floor(item.rating || 0))}
                </div>
                <div className="text-xl font-bold dark:text-white">
                  ${item.price}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0.4; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
