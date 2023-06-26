import { useLoaderData } from "react-router-dom";
import { Product } from "../types/products";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export function Products() {
  const { products: initialProducts } = useLoaderData() as {
    products: Product[];
  };

  const {
    isError,
    data: products,
    isLoading,
  } = useProducts({
    initialData: initialProducts,
    refetchInterval: 1000 * 60 * 60,
  });

  console.log({ isError, data: products, isLoading });

  return (
    <div>
      <h2 className="mb-8 text-4xl font-semibold">Products</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
