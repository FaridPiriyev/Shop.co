import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Star, CircleCheck, ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const Slider: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://dummyjson.com/comments?limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("API xətası");
        return res.json();
      })
      .then((data) => {
        if (data && data.comments) {
          setComments(data.comments);
        }
      })
      .catch((err) => {
        console.error("Yükləmə xətası:", err);
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Məlumat yüklənərkən xəta baş verdi.
      </div>
    );
  }

  if (comments.length === 0) {
    return <div className="py-20 text-center font-bold">YÜKLƏNİR...</div>;
  }

  return (
    <section className="py-16 px-4 md:px-10 bg-white min-h-[500px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-[900] uppercase tracking-tighter">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex gap-2">
            <button className="slider-prev p-2 border border-gray-200 rounded-full hover:bg-gray-100 transition-all cursor-pointer">
              <ArrowLeft size={24} />
            </button>
            <button className="slider-next p-2 border border-gray-200 rounded-full hover:bg-gray-100 transition-all cursor-pointer">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: ".slider-prev",
            nextEl: ".slider-next",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {comments.map((comment) => (
            <SwiperSlide key={comment.id} className="h-auto">
              <div className="border border-gray-200 rounded-[20px] p-8 h-full flex flex-col gap-4 shadow-sm">
                <div className="flex text-[#FFC633] gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#FFC633" strokeWidth={0} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl">
                    {comment.user?.fullName ||
                      comment.user?.username ||
                      "Müştəri"}
                  </span>
                  <CircleCheck
                    size={20}
                    fill="#01AB31"
                    className="text-white"
                  />
                </div>


                <p className="text-gray-600 leading-relaxed">
                  "{comment.body}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;
