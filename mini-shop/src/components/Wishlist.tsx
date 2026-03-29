import { useWishlist } from "../components/WishlistContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="max-w-[1240px] mx-auto my-10 px-5 font-['Inter',sans-serif]">
      <h1 className="text-[32px] font-black mb-[30px] uppercase dark:text-white">
        Your Wishlist ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-[100px] border border-dashed border-gray-200 dark:border-zinc-800 rounded-[20px]">
          <p className="text-black/60 dark:text-white/60 mb-4">
            Sizin wishlist hələ ki boşdur.
          </p>
          <Link
            to="/"
            className="text-black dark:text-white font-bold underline hover:opacity-70 transition-opacity"
          >
            Alış-verişə davam et
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border border-[#eee] dark:border-zinc-800 rounded-[20px] p-[15px] relative bg-white dark:bg-zinc-900/50 hover:shadow-lg transition-shadow"
            >
              <div className="bg-[#F0EEED] dark:bg-zinc-800 rounded-[15px] overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-[200px] object-contain mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-[18px] font-bold mt-[15px] mb-[5px] truncate dark:text-white">
                {item.title}
              </h3>

              <p className="font-bold text-xl dark:text-white">${item.price}</p>

              <div className="flex gap-2.5 mt-[15px]">
                <Link
                  to={`/product/${item.id}`}
                  className="flex-1 text-center py-2.5 bg-black dark:bg-white dark:text-black text-white rounded-full no-underline text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  View Product
                </Link>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="p-2.5 border border-[#eee] dark:border-zinc-800 rounded-full cursor-pointer bg-white dark:bg-zinc-900 group hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2
                    size={18}
                    className="text-red-500 group-hover:scale-110 transition-transform"
                  />
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
