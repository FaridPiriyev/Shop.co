import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product, ProductResponse } from "../types/product";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const limit = Number(searchParams.get("limit")) || 20;
  const skip = Number(searchParams.get("skip")) || 0;

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((data: ProductResponse) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, [limit, skip]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-black mb-10 uppercase text-center">
        All Products
      </h1>

      {loading ? (
        <p className="text-center">Yüklənir...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <button
              disabled={skip === 0}
              onClick={() =>
                setSearchParams({
                  limit: String(limit),
                  skip: String(skip - limit),
                })
              }
              className="px-6 py-2 border rounded-full disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={() =>
                setSearchParams({
                  limit: String(limit),
                  skip: String(skip + limit),
                })
              }
              className="px-6 py-2 border rounded-full bg-black text-white"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
