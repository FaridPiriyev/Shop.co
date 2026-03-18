import { useCart } from "../components/CartContext";
import { Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";
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
        <h1 className="text-4xl font-black uppercase mb-4">
          YOUR CART IS EMPTY
        </h1>
        <p className="text-gray-500 mb-8">
          Səbətinizdə hazırda heç bir məhsul yoxdur.
        </p>
        <Link
          to="/"
          className="bg-black text-white px-8 py-4 rounded-full font-medium inline-block"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-10">
      <div className="text-sm text-gray-500 mb-6 flex gap-2">
        <Link to="/">Home</Link> &gt; <span className="text-black">Cart</span>
      </div>
      <h1 className="text-4xl font-black uppercase mb-8">YOUR CART</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-[1.5] border border-gray-200 rounded-[20px] p-4 lg:p-6 h-fit">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4 py-6 border-b border-gray-200 last:border-0 last:pb-0 first:pt-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-contain rounded-[10px] bg-[#F0EEED] p-2"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl">{item.title}</h3>
                    <p className="text-sm mt-1">
                      Size:{" "}
                      <span className="text-gray-500">
                        {item.size || "Large"}
                      </span>
                    </p>
                    <p className="text-sm mt-1">
                      Color:{" "}
                      <span className="text-gray-500">
                        {item.color || "White"}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#FF3333]"
                  >
                    <Trash2 fill="#FF3333" stroke="#FF3333" size={24} />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold">${item.price}</span>
                  <div className="flex items-center justify-between w-[120px] bg-[#F0F0F0] px-4 py-2.5 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-xl"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-xl"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 border border-gray-200 rounded-[20px] p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-5 text-xl">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Discount (-20%)</span>
              <span className="text-[#FF3333] font-bold">
                -${discount.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-bold">${deliveryFee}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(0)}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <div className="flex-1 bg-[#F0F0F0] px-4 py-3 rounded-full flex items-center gap-2">
              <Tag color="gray" size={20} />
              <input
                type="text"
                placeholder="Add promo code"
                className="bg-transparent outline-none w-full text-black placeholder:text-gray-500"
              />
            </div>
            <button className="bg-black text-white px-8 py-3 rounded-full font-medium transition hover:bg-gray-800">
              Apply
            </button>
          </div>

          <button className="w-full bg-black text-white mt-6 py-4 rounded-full font-medium flex items-center justify-center gap-3 transition hover:bg-gray-800">
            Go to Checkout <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
