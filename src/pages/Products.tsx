import { useLoaderData } from "react-router-dom";
import { Product } from "../types/products";
import { ProductCard } from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";

export function Products() {
  const { products: initialProducts } = useLoaderData() as {
    products: Product[];
  };

  const {
    isError,
    data: products,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialData: initialProducts,
    refetchInterval: 1000 * 60 * 60,
  });

  console.log({ isError, data: products, isLoading });

  return (
    <div>
      <h2 className="text-4xl mb-8 font-semibold">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
