import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { Product } from "../types/products";

export const useProducts = (options?: UseQueryOptions<Product[], Error>) =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    ...options,
  });
