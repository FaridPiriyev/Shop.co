import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("popular");

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const styles = [
    { title: "Casual", slug: "mens-shirts" },
    { title: "Formal", slug: "mens-shoes" },
    { title: "Party", slug: "womens-dresses" },
    { title: "Gym", slug: "sports-accessories" },
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
        setProducts(data.products);
        setLoading(false);
      });
  }, [categoryName]);

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName],
    );
  };

  const handleApplyFilter = () => {
    let filtered = allProducts.filter((p: any) => {
      return p.price >= minPrice && p.price <= maxPrice;
    });

    if (sortBy === "price-high") {
      filtered.sort((a: any, b: any) => b.price - a.price);
    } else if (sortBy === "price-low") {
      filtered.sort((a: any, b: any) => a.price - b.price);
    } else if (sortBy === "popular") {
      filtered.sort((a: any, b: any) => b.rating - a.rating);
    }

    setProducts([...filtered]);
  };

  useEffect(() => {
    handleApplyFilter();
  }, [sortBy]);

  if (loading)
    return <div className="text-center py-20 font-bold">Yüklənir...</div>;

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-[295px] border border-black/10 rounded-[20px] p-6 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-black">Filters</h3>
            <span className="opacity-40 cursor-pointer">
              <svg width="21" height="19" viewBox="0 0 21 19" fill="none">
                <path
                  d="M11.25 9V17.625C11.25 17.9234 11.1315 18.2095 10.9205 18.4205C10.7095 18.6315 10.4234 18.75 10.125 18.75C9.82663 18.75 9.54048 18.6315 9.3295 18.4205C9.11853 18.2095 9 17.9234 9 17.625V9C9 8.70163 9.11853 8.41548 9.3295 8.2045C9.54048 7.99353 9.82663 7.875 10.125 7.875C10.4234 7.875 10.7095 7.99353 10.9205 8.2045C11.1315 8.41548 11.25 8.70163 11.25 9ZM16.875 15.375C16.5766 15.375 16.2905 15.4935 16.0795 15.7045C15.8685 15.9155 15.75 16.2016 15.75 16.5V17.625C15.75 17.9234 15.8685 18.2095 16.0795 18.4205C16.2905 18.6315 16.5766 18.75 16.875 18.75C17.1734 18.75 17.4595 18.6315 17.6705 18.4205C17.8815 18.2095 18 17.9234 18 17.625V16.5C18 16.2016 17.8815 15.9155 17.6705 15.7045C17.4595 15.4935 17.1734 15.375 16.875 15.375ZM19.125 11.625H18V1.125C18 0.826631 17.8815 0.540483 17.6705 0.329505C17.4595 0.118526 17.1734 0 16.875 0C16.5766 0 16.2905 0.118526 16.0795 0.329505C15.8685 0.540483 15.75 0.826631 15.75 1.125V11.625H14.625C14.3266 11.625 14.0405 11.7435 13.8295 11.9545C13.6185 12.1655 13.5 12.4516 13.5 12.75C13.5 13.0484 13.6185 13.3345 13.8295 13.5455C14.0405 13.7565 14.3266 13.875 14.625 13.875H19.125C19.4234 13.875 19.7095 13.7565 19.9205 13.5455C20.1315 13.3345 20.25 13.0484 20.25 12.75C20.25 12.4516 20.1315 12.1655 19.9205 11.9545C19.7095 11.7435 19.4234 11.625 19.125 11.625ZM3.375 12.375C3.07663 12.375 2.79048 12.4935 2.5795 12.7045C2.36853 12.9155 2.25 13.2016 2.25 13.5V17.625C2.25 17.9234 2.36853 18.2095 2.5795 18.4205C2.79048 18.6315 3.07663 18.75 3.375 18.75C3.67337 18.75 3.95952 18.6315 4.1705 18.4205C4.38147 18.2095 4.5 17.9234 4.5 17.625V13.5C4.5 13.2016 4.38147 12.9155 4.1705 12.7045C3.95952 12.4935 3.67337 12.375 3.375 12.375ZM5.625 8.625H4.5V1.125C4.5 0.826631 4.38147 0.540483 4.1705 0.329505C3.95952 0.118526 3.67337 0 3.375 0C3.07663 0 2.79048 0.118526 2.5795 0.329505C2.36853 0.540483 2.25 0.826631 2.25 1.125V8.625H1.125C0.826631 8.625 0.540483 8.74353 0.329505 8.9545C0.118526 9.16548 0 9.45163 0 9.75C0 10.0484 0.118526 10.3345 0.329505 10.5455C0.540483 10.7565 0.826631 10.875 1.125 10.875H5.625C5.92337 10.875 6.20952 10.7565 6.4205 10.5455C6.63147 10.3345 6.75 10.0484 6.75 9.75C6.75 9.45163 6.63147 9.16548 6.4205 8.9545C6.20952 8.74353 5.92337 8.625 5.625 8.625ZM12.375 4.125H11.25V1.125C11.25 0.826631 11.1315 0.540483 10.9205 0.329505C10.7095 0.118526 10.4234 0 10.125 0C9.82663 0 9.54048 0.118526 9.3295 0.329505C9.11853 0.540483 9 0.826631 9 1.125V4.125H7.875C7.57663 4.125 7.29048 4.24353 7.0795 4.4545C6.86853 4.66548 6.75 4.95163 6.75 5.25C6.75 5.54837 6.86853 5.83452 7.0795 6.0455C7.29048 6.25647 7.57663 6.375 7.875 6.375H12.375C12.6734 6.375 12.9595 6.25647 13.1705 6.0455C13.3815 5.83452 13.5 5.54837 13.5 5.25C13.5 4.95163 13.3815 4.66548 13.1705 4.4545C12.9595 4.24353 12.6734 4.125 12.375 4.125Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="space-y-4 mb-6 text-black/60 font-medium">
            {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center cursor-pointer hover:text-black"
              >
                <span>{item}</span>
                <span className="text-lg">›</span>
              </div>
            ))}
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="mb-6">
            <h4 className="font-bold mb-6 text-black">Price</h4>
            <div className="relative w-full h-2 bg-[#F0F0F0] rounded-full mb-8">
              <input
                type="range"
                min="0"
                max="400"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))
                }
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer accent-black z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
              />
              <input
                type="range"
                min="0"
                max="400"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))
                }
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer accent-black z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
              />
              <div
                className="absolute h-2 bg-black rounded-full z-10"
                style={{
                  left: `${(minPrice / 400) * 100}%`,
                  right: `${100 - (maxPrice / 400) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between font-bold text-black text-sm">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="mb-6">
            <h4 className="font-bold mb-4 text-black">Colors</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "green", class: "bg-green-500" },
                { name: "red", class: "bg-red-500" },
                { name: "yellow", class: "bg-yellow-500" },
                { name: "orange", class: "bg-orange-500" },
                { name: "blue", class: "bg-blue-500" },
                { name: "purple", class: "bg-purple-600" },
                { name: "pink", class: "bg-pink-500" },
                { name: "white", class: "bg-white border-black/10" },
                { name: "black", class: "bg-black" },
              ].map((color) => (
                <div
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`w-9 h-9 rounded-full ${color.class} cursor-pointer border flex items-center justify-center transition hover:scale-110 shadow-sm relative`}
                >
                  {selectedColors.includes(color.name) && (
                    <span
                      className={
                        color.name === "white"
                          ? "text-black text-xs font-bold"
                          : "text-white text-xs font-bold"
                      }
                    >
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="mb-6">
            <h4 className="font-bold mb-4 text-black">Size</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "XX-Small",
                "X-Small",
                "Small",
                "Medium",
                "Large",
                "X-Large",
                "XX-Large",
                "3X-Large",
                "4X-Large",
              ].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 bg-[#F0F0F0] rounded-full text-xs font-medium text-black/60 hover:bg-black hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="mb-6">
            <h4 className="font-bold mb-4 text-black">Dress Style</h4>
            <div className="space-y-4 text-black/60 font-medium">
              {styles.map((style) => (
                <div
                  key={style.title}
                  onClick={() => navigate(`/category/${style.slug}`)}
                  className="flex justify-between items-center cursor-pointer hover:text-black group"
                >
                  <span>{style.title}</span>
                  <span className="text-lg opacity-40 group-hover:opacity-100 transition">
                    ›
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleApplyFilter}
            className="w-full bg-black text-white py-4 rounded-full font-bold mt-2 active:scale-95 transition"
          >
            Apply Filter
          </button>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-black text-black capitalize">
              {categoryName?.replace("-", " ")}
            </h2>
            <div className="text-black/60 text-sm flex items-center gap-2">
              Showing {products.length} Products Sort by:{" "}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-black font-bold cursor-pointer bg-transparent border-none outline-none focus:ring-0"
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
                Bu kriterlərə uyğun məhsul tapılmadı.
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-12 pt-5 border-t border-black/10">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 font-bold flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M12.8333 7H1.16667M1.16667 7L7 12.8333M1.16667 7L7 1.16667"
                  stroke="black"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Previous
            </button>
            <div className="flex gap-1 md:gap-2">
              {[1, 2, 3, "...", 8, 9, 10].map((num, i) => (
                <span
                  key={i}
                  className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg cursor-pointer font-bold ${num === 1 ? "bg-black/5" : "text-black/50"}`}
                >
                  {num}
                </span>
              ))}
            </div>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 font-bold flex items-center gap-2">
              Next
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1.16667 7H12.8333M12.8333 7L7 1.16667M12.8333 7L7 12.8333"
                  stroke="black"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </main>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: all;
          width: 20px;
          height: 20px;
          background-color: black;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 2px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;
