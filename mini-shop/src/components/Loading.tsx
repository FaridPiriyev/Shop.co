import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      
      <p className="mt-4 text-black font-bold text-xl tracking-widest animate-pulse">
        LOADING...
      </p>
    </div>
  );
};

export default Loading;