import React from "react";
import { useNavigate } from "react-router-dom";

const BrowseByStyle = () => {
  const navigate = useNavigate();

  const styles = [
    {
      title: "Casual",
      slug: "mens-shirts", 
      img: "/category1.png",
      className: "md:col-span-4",
      position: "left center",
      flip: true,
      zoom: 1.8,
    },
    {
      title: "Formal",
      slug: "mens-watches", 
      img: "/category2.png",
      className: "md:col-span-8",
      position: "right center",
      flip: true,
      zoom: 1,
    },
    {
      title: "Party",
      slug: "womens-dresses",
      img: "/category3.png",
      className: "md:col-span-8",
      position: "center",
      flip: false,
      zoom: 1,
    },
    {
      title: "Gym",
      slug: "sports-accessories", 
      img: "/category4.png",
      className: "md:col-span-4",
      position: "center",
      flip: false,
      zoom: 1,
    },
  ];
  return (
    <section className="max-w-[1240px] mx-auto px-4 py-10">
      <div className="bg-[#F0F0F0] rounded-[40px] p-6 md:p-16">
        <h2 className="text-3xl md:text-[48px] font-black text-center mb-12 uppercase tracking-tight text-black font-['Integral_CF',sans-serif]">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {styles.map((style, index) => (
            <div
              key={index}
              onClick={() => navigate(`/category/${style.slug}`)}
              className={`${style.className} relative h-[289px] bg-white rounded-[20px] overflow-hidden group cursor-pointer`}
            >
              <span className="absolute top-6 left-9 text-2xl md:text-3xl font-bold z-10 text-black font-['Satoshi']">
                {style.title}
              </span>

              <img
                src={style.img}
                alt={style.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.1]"
                style={{
                  transform: `${style.flip ? "scaleX(-1)" : "scaleX(1)"} scale(${style.zoom})`,
                  objectPosition: style.position,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByStyle;
