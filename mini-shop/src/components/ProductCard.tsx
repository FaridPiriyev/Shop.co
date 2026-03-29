import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = product.discountPercentage > 10;
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(0);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-1 min-w-[250px] cursor-pointer transition-transform duration-200 group"
    >
      <div className="bg-[#F0EEED] dark:bg-zinc-800 rounded-[20px] aspect-square flex items-center justify-center overflow-hidden mb-4 transition-colors duration-300">
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`w-full h-auto mix-blend-multiply dark:mix-blend-normal transition-transform duration-400 
            ${isHovered ? "scale-110" : "scale-100"}`}
        />
      </div>

      <h3 className="text-[18px] font-bold my-2.5 text-black dark:text-white transition-colors">
        {product.title}
      </h3>
      <div className="flex items-center gap-2.5 mb-2">
        <div className="text-[#FFC633] text-[22px] tracking-[2px]">
          {"★".repeat(Math.floor(product.rating))}
        </div>
        <span className="text-sm text-black/60 dark:text-zinc-400 font-medium">
          {product.rating}/5
        </span>
      </div>

      <div className="flex items-center gap-2.5 text-[22px] font-bold">
        <span className="text-black dark:text-white">${product.price}</span>

        {hasDiscount && (
          <>
            <span className="text-black/40 dark:text-white/30 line-through font-normal">
              ${originalPrice}
            </span>
            <span className="bg-red-500/10 text-[#FF3333] px-3 py-1 rounded-full text-xs font-medium">
              -{Math.round(product.discountPercentage)}%
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
