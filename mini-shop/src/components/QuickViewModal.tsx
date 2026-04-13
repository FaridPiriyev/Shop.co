import React from "react";
import { X, ShoppingCart, Star } from "lucide-react";

interface QuickViewProps {
  product: any;
  onClose: () => void;
  onAddToCart: (product: any) => void;
}

const QuickViewModal: React.FC<QuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-[900px] rounded-[20px] overflow-hidden relative flex flex-col md:flex-row animate-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 bg-white/80 dark:bg-black/50 rounded-full hover:rotate-90 transition-transform dark:text-white"
        >
          <X size={20} />
        </button>

        <div className="md:w-1/2 bg-[#F0EEED] dark:bg-[#2a2a2a] flex items-center justify-center p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-[300px] md:max-h-[400px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase mb-2 dark:text-white font-['Integral_CF'] leading-tight">
            {product.title}
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-sm dark:text-gray-400">
              {product.rating} / 5
            </span>
          </div>

          <p className="text-2xl font-bold mb-4 dark:text-white">
            ${product.price}
          </p>

          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base leading-relaxed line-clamp-5">
            {product.description}
          </p>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full bg-black dark:bg-white dark:text-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-80 transition-all active:scale-95"
          >
            <ShoppingCart size={20} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
