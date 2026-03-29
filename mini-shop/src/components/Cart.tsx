import { useCart } from "../components/CartContext";
import { Trash, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const discount = subtotal * 0.2;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-4">
          YOUR CART IS EMPTY
        </h1>
        <p className="text-gray-500 mb-8">
          There are currently no products in your cart.
        </p>
        <Link
          to="/"
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium inline-block transition active:scale-95"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 md:py-10">
      <div className="text-sm text-black/60 dark:text-white mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-black dark:hover:text-white transition">
          Home
        </Link>
        <span className="opacity-40">&gt;</span>
        <span className="text-black dark:text-white">Cart</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black uppercase mb-8">
        YOUR CART
      </h1>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-[1.6] border border-black/10 rounded-[20px] px-4 md:px-6 h-fit bg-white dark:bg-black">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className={`flex gap-4 py-6 ${
                index !== cartItems.length - 1 ? "border-b border-black/10" : ""
              }`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F0EEED] dark:bg-black rounded-[10px] flex items-center justify-center p-2 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg md:text-xl line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm mt-1">
                      Size:{" "}
                      <span className="text-black/60 dark:text-white">
                        {item.size || "Standard"}
                      </span>
                    </p>
                    <p className="text-sm mt-0.5">
                      Color:{" "}
                      <span className="text-black/60 dark:text-white">
                        {item.color || "Default"}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.size, item.color)
                    }
                    className="text-[#FF3333] hover:scale-110 transition-transform"
                  >
                    <Trash fill="#FF3333" stroke="#FF3333" size={22} />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl md:text-2xl font-bold">
                    ${item.price}
                  </span>
                  <div className="flex items-center justify-between w-[100px] md:w-[120px] bg-[#F0F0F0] dark:bg-black px-3 py-2 md:px-4 md:py-2.5 rounded-full">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          item.color,
                          item.quantity - 1,
                        )
                      }
                      className="hover:opacity-60 transition"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-medium text-base md:text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          item.color,
                          item.quantity + 1,
                        )
                      }
                      className="hover:opacity-60 transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 border border-black/10 rounded-[20px] p-5 md:p-6 h-fit bg-white dark:bg-black">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-lg md:text-xl">
              <span className="text-black/60 dark:text-white">Subtotal</span>
              <span className="font-bold">${subtotal}</span>
            </div>

            <div className="flex justify-between text-lg md:text-xl">
              <span className="text-black/60 dark:text-white">Discount (-20%)</span>
              <span className="text-[#FF3333] font-bold">
                -${Math.round(discount)}
              </span>
            </div>

            <div className="flex justify-between text-lg md:text-xl">
              <span className="text-black/60 dark:text-white">Delivery Fee</span>
              <span className="font-bold">${deliveryFee}</span>
            </div>

            <hr className="border-black/10 my-1" />

            <div className="flex justify-between text-xl md:text-2xl font-bold pt-1">
              <span>Total</span>
              <span>${Math.round(total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-row gap-3">
            <div className="flex-1 bg-[#F0F0F0] dark:bg-black px-4 py-3 rounded-full flex items-center gap-2">
              <Tag className="text-black/40 dark:text-white" size={20} />
              <input
                type="text"
                placeholder="Add promo code"
                className="bg-transparent border-none outline-none w-full text-sm md:text-base placeholder:text-black/40 dark:placeholder:text-white"
              />
            </div>
            <button className="bg-black text-white dark:bg-white dark:text-black px-6 md:px-8 py-3 rounded-full font-medium text-sm md:text-base transition hover:bg-black/80 active:scale-95 dark:hover-bg-white">
              Apply
            </button>
          </div>
          <button className="w-full bg-black text-white dark:bg-white dark:text-black mt-4 md:mt-6 py-4 rounded-full font-medium flex items-center justify-center gap-3 transition hover:bg-black/80 dark:hover-bg-white active:scale-95 group">
            Go to Checkout
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
