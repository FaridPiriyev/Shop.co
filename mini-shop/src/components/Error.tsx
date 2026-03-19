import React from "react";

interface ErrorProps {
  message: string;
  onRetry: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <h3 className="text-xl font-bold text-red-600 mb-2">
      Oops! There was a problem.
    </h3>
    <p className="text-gray-500 mb-6">{message}</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-black text-white rounded-full font-bold hover:opacity-80 transition"
    >
      Check again.
    </button>
  </div>
);

export default Error;
