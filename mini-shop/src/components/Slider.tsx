import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  Star,
  Check, 
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const Slider: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/comments?limit=12")
      .then((res) => {
        if (!res.ok) throw new Error("API xətası");
        return res.json();
      })
      .then((data) => {
        if (data && data.comments) {
          setComments(data.comments);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Yükləmə xətası:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500 gap-2">
        <p className="font-bold text-lg">Məlumat yüklənərkən xəta baş verdi.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm underline hover:text-red-700"
        >
          Check Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
          <h2 className="text-3xl md:text-5xl font-[900] uppercase tracking-tighter leading-none">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex gap-3">
            <button className="slider-prev w-12 h-12 flex items-center justify-center border border-gray-100 rounded-full hover:bg-gray-50 active:scale-95 transition-all shadow-sm cursor-pointer">
              <ArrowLeft size={24} />
            </button>
            <button className="slider-next w-12 h-12 flex items-center justify-center border border-gray-100 rounded-full hover:bg-gray-50 active:scale-95 transition-all shadow-sm cursor-pointer">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 text-gray-400 gap-3">
            <Loader2 className="animate-spin" size={32} />
            <span className="font-medium tracking-widest uppercase">
              LOADING...
            </span>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            centeredSlides={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".slider-prev",
              nextEl: ".slider-next",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="!overflow-visible"
          >
            {comments.map((comment) => (
              <SwiperSlide key={comment.id} className="h-auto">
                <div className="border border-gray-100 rounded-[20px] p-6 md:p-8 h-full flex flex-col gap-4 bg-white transition-all duration-300 hover:border-gray-300 select-none">
                  <div className="flex text-[#FFC633] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="#FFC633" strokeWidth={0} />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg md:text-xl">
                      {comment.user?.fullName || "Valuable Customer"}
                    </span>

                    <div className="bg-[#01AB31] rounded-full w-[22px] h-[22px] flex items-center justify-center">
                      <Check
                        size={14}
                        className="text-white"
                        strokeWidth={4} 
                      />
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed italic">
                    "
                    {comment.body.length > 120
                      ? `${comment.body.substring(0, 120)}...`
                      : comment.body}
                    "
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Slider;
