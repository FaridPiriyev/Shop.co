import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import ErrorComponent from "./Error";
import {
  Check,
  SlidersHorizontal,
  ChevronRight,
  ChevronUp,
  X,
} from "lucide-react";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("popular");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categoryMap: { [key: string]: string } = {
    Casual: "mens-shirts",
    Formal: "mens-shirts",
    Party: "tops",
    Gym: "mens-shoes",
    "T-shirts": "mens-shirts",
    Shorts: "mens-shoes",
    Shirts: "mens-shirts",
    Hoodie: "tops",
    Jeans: "mens-shirts",
  };

  const colors = [
    "#00C12B",
    "#F50606",
    "#F5DD06",
    "#F57906",
    "#06BEF5",
    "#0000FF",
    "#7D06F5",
    "#F506A4",
    "#FFFFFF",
    "#000000",
  ];
  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const slug =
        !categoryName || categoryName === "all" ? "mens-shirts" : categoryName;
      const url = `https://dummyjson.com/products/category/${slug}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Məlumat gətirilərkən xəta baş verdi.");
      const data = await res.json();
      setAllProducts(data.products);
      setProducts(data.products);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryName]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleApplyFilter = useCallback(() => {
    let filtered = allProducts.filter(
      (p: any) => p.price >= minPrice && p.price <= maxPrice,
    );
    if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "popular") filtered.sort((a, b) => b.rating - a.rating);
    setProducts([...filtered]);
    setDrawerOpen(false);
  }, [allProducts, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    if (allProducts.length > 0) {
      handleApplyFilter();
    }
  }, [sortBy, handleApplyFilter, allProducts]);

  const handleCategoryNavigation = (style: string) => {
    const slug = categoryMap[style] || "mens-shirts";
    navigate(`/category/${slug}`);
  };

  const FilterContent = ({ onClose }: { onClose?: () => void }) => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-black">Filters</h3>
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <X size={24} className="text-black" />
            </button>
          )}
        </div>
      </div>
      <hr className="mb-6 opacity-10" />

      <div className="space-y-4 mb-6 text-black/60 font-medium">
        {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
          <div
            key={item}
            onClick={() => handleCategoryNavigation(item)}
            className="flex justify-between items-center cursor-pointer hover:text-black transition-colors"
          >
            <span>{item}</span>
            <ChevronRight size={16} className="opacity-40" />
          </div>
        ))}
      </div>
      <hr className="mb-6 opacity-10" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-5">
          <h4 className="font-bold text-black text-lg">Price</h4>
          <ChevronUp size={20} />
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-[#F0F0F0] rounded-full appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between font-bold text-black text-sm mt-4">
          <span>$0</span>
          <span>Max: ${maxPrice}</span>
        </div>
      </div>
      <hr className="mb-6 opacity-10" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-5 font-bold text-lg">
          <h4>Colors</h4>
          <ChevronUp size={20} />
        </div>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColors([color])}
              className="w-[37px] h-[37px] rounded-full border border-black/10 flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              {selectedColors.includes(color) && (
                <Check
                  size={16}
                  color={color === "#FFFFFF" ? "black" : "white"}
                  strokeWidth={3}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <hr className="mb-6 opacity-10" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-5 font-bold text-lg">
          <h4>Size</h4>
          <ChevronUp size={20} />
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-black/60"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <hr className="mb-6 opacity-10" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-5 font-bold text-lg">
          <h4>Dress Style</h4>
          <ChevronUp size={20} />
        </div>
        <div className="space-y-4 text-black/60 font-medium">
          {dressStyles.map((style) => (
            <div
              key={style}
              onClick={() => handleCategoryNavigation(style)}
              className={`flex justify-between items-center cursor-pointer hover:text-black transition-colors ${
                categoryName === categoryMap[style]
                  ? "text-black font-bold"
                  : ""
              }`}
            >
              <span>{style}</span>
              <ChevronRight size={16} className="opacity-40" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleApplyFilter}
        className="w-full bg-black text-white py-4 rounded-full font-bold active:scale-95 transition"
      >
        Apply Filter
      </button>
    </>
  );

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-[295px] border border-black/10 rounded-[20px] p-6 h-fit bg-white shadow-sm flex-shrink-0">
          <FilterContent />
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-black text-black capitalize">
              {categoryName?.replace("-", " ") || "Products"}
            </h2>
            <div className="text-black/60 text-sm flex items-center gap-2">
              <button
                className="md:hidden flex items-center gap-1.5 border border-black/15 rounded-full px-3 py-1.5 text-black font-medium text-sm hover:bg-gray-50 transition"
                onClick={() => setDrawerOpen(true)}
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
              <span className="hidden sm:inline">
                Showing {products.length} Products |{" "}
              </span>
              Sort by:{" "}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-black font-bold bg-transparent outline-none border-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {products.length > 0 ? (
              products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400">
                No products were found in this category.
              </div>
            )}
          </div>
        </main>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[24px] shadow-2xl md:hidden
          transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "90vh" }}
      >
        <div
          className="overflow-y-auto px-6 py-8"
          style={{ maxHeight: "90vh" }}
        >
          <FilterContent onClose={() => setDrawerOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
