import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard"; 

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState(200);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading)
    return <div className="text-center py-20 font-bold">Yüklənir...</div>;

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-[295px] border border-black/10 rounded-[20px] p-6 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-black">Filters</h3>
            <span className="cursor-pointer opacity-40">⚙️</span>
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="space-y-4 mb-6 text-black/60">
            {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center cursor-pointer hover:text-black"
              >
                <span>{item}</span>
                <span>{">"}</span>
              </div>
            ))}
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="mb-6">
            <h4 className="font-bold mb-4 text-black">Price</h4>
            <input
              type="range"
              className="w-full accent-black"
              min="0"
              max="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <div className="flex justify-between font-bold mt-2 text-black">
              <span>$50</span>
              <span>${priceRange}</span>
            </div>
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="mb-6">
            <h4 className="font-bold mb-4 text-black">Colors</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "bg-green-500",
                "bg-red-500",
                "bg-yellow-500",
                "bg-orange-500",
                "bg-blue-500",
                "bg-black",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${color} cursor-pointer border border-black/10 shadow-sm`}
                />
              ))}
            </div>
          </div>

          <hr className="mb-6 opacity-10" />

          <div className="mb-6">
            <h4 className="font-bold mb-4 text-black">Size</h4>
            <div className="flex flex-wrap gap-2">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  className="px-5 py-2 bg-[#F0F0F0] rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-full font-medium mt-4">
            Apply Filter
          </button>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-black capitalize">
              {categoryName?.replace("-", " ")}
            </h2>
            <p className="text-black/60 text-sm">
              Showing 1-{products.length} of 100 Products Sort by:{" "}
              <span className="text-black font-bold cursor-pointer">
                Most Popular
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-12 pt-5 border-t border-black/10">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 font-medium">
              Previous
            </button>
            <div className="flex gap-2">
              {[1, 2, 3, "...", 8, 9, 10].map((num, i) => (
                <span
                  key={i}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${num === 1 ? "bg-black/5 font-bold" : ""}`}
                >
                  {num}
                </span>
              ))}
            </div>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 font-medium">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
