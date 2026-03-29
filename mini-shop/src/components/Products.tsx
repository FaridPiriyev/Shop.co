import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Product, ProductResponse } from "../types/product";
import ProductCard from "./ProductCard";
import {
  AlertCircle,
  RefreshCcw,
  Loader2,
  X,
  ShoppingCart,
  Star,
  Eye,
} from "lucide-react";
import { useCart } from "./CartContext";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-zinc-900 w-full max-w-[900px] rounded-[20px] overflow-hidden relative flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 bg-white/80 dark:bg-zinc-800 dark:text-white rounded-full hover:rotate-90 transition-transform duration-200 border-none cursor-pointer flex items-center justify-center"
        >
          <X size={20} />
        </button>

        <div className="w-full md:w-1/2 bg-[#F0EEED] dark:bg-zinc-800 flex items-center justify-center p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-[300px] md:max-h-[380px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center dark:text-white">
          <h2 className="text-2xl md:text-[26px] font-black uppercase mb-2.5 leading-tight italic">
            {product.title}
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="fill-[#FFC633] stroke-[#FFC633]" />
            <span className="text-sm text-black/50 dark:text-zinc-400">
              {product.rating} / 5
            </span>
          </div>

          <p className="text-2xl md:text-[26px] font-bold mb-4">
            ${product.price}
          </p>

          <p className="text-black/60 dark:text-zinc-400 leading-relaxed text-sm mb-8 line-clamp-5">
            {product.description}
          </p>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2.5 hover:opacity-80 active:scale-95 transition-all border-none cursor-pointer"
          >
            <ShoppingCart size={20} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => {
        if (!res.ok) throw new Error("Məhsullar gətirilərkən xəta baş verdi.");
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
    fetchProducts();
  }, [fetchProducts]);

  const handleQuickViewAddToCart = (p: Product) => {
    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.thumbnail,
      quantity: 1,
      size: "Large",
      color: "Olive",
    });
  };

  const CardWithQuickView = ({ item }: { item: Product }) => (
    <div
      className="relative group"
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <ProductCard product={item} />
      <div
        className={`absolute top-[35%] left-1/2 -translate-x-1/2 z-10 transition-all duration-300 
          ${hoveredId === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5 pointer-events-none"}`}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setQuickViewProduct(item);
          }}
          className="bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full w-[45px] h-[45px] flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-none cursor-pointer"
        >
          <Eye size={22} />
        </button>
      </div>
    </div>
  );

  const renderSection = (title: string, products: Product[]) => (
    <section className="mb-10">
      <h2 className="text-[32px] md:text-[48px] font-black text-center mb-8 md:mb-10 uppercase italic tracking-tighter dark:text-white font-serif">
        {title}
      </h2>
      <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-4 md:gap-5 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
        {products.map((item) => (
          <div
            key={item.id}
            className="flex-none w-[calc(50%-8px)] md:w-full snap-start"
          >
            <CardWithQuickView item={item} />
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/category/all?limit=20&skip=0")}
        className="block mx-auto mt-8 px-14 py-4 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all w-full md:w-auto cursor-pointer"
      >
        View All
      </button>
    </section>
  );

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-5 md:py-[60px]">
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleQuickViewAddToCart}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            className="animate-spin text-black dark:text-white"
            size={40}
          />
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2 dark:text-white">
            Xəta baş verdi
          </h2>
          <p className="text-black/60 dark:text-zinc-400 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="inline-flex items-center gap-2.5 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full hover:opacity-80 transition-all border-none cursor-pointer"
          >
            <RefreshCcw size={18} /> Yenidən yoxla
          </button>
        </div>
      ) : (
        <>
          {renderSection("NEW ARRIVALS", items.slice(0, 4))}
          <hr className="border-0 border-t border-[#f0f0f0] dark:border-zinc-800 my-10" />
          {renderSection("TOP SELLING", items.slice(4, 8))}
        </>
      )}
    </div>
  );
};

export default Products;
