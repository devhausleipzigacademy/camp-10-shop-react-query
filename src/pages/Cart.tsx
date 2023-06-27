import { useRouteLoaderData } from "react-router-dom";
import { ItemDropdown } from "../components/ItemDropdown";
import { CartItem } from "../types/cart";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useUnicornContext } from "../context/UnicornContext";

export function Cart() {
  console.log("rendering cart");
  const { phrase } = useUnicornContext();
  const { cart: initialCart } = useRouteLoaderData("root") as {
    cart: CartItem[];
  };

  const { data: cart } = useCart({
    initialData: initialCart,
  });

  const { data: products, isLoading } = useProducts({
    enabled: cart && cart.length > 0,
  });
  console.log({ cart });

  const productsWithQuanty = products
    ?.filter((product) => {
      return cart?.some((item) => item.productId === product.id);
    })
    .map((product) => {
      const item = cart?.find((item) => item.productId === product.id);
      return {
        ...product,
        quantity: item?.quantity,
        item,
      };
    });
  console.log(productsWithQuanty);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl">{phrase}</h1>
      {productsWithQuanty?.map((product) => (
        <div key={product.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover"
            />
            <span className="font-medium text-lg">{product.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Price: ${product.price}</span>
            <span>Quantity: {product.quantity}</span>
            <span>Total: ${product.quantity! * product.price}</span>
            {product.item && <ItemDropdown item={product.item} />}
          </div>
        </div>
      ))}
      <div className="flex flex-col items-end">
        <h3 className="text-2xl font-semibold">Total</h3>
        <span className="text-3xl font-medium">
          $
          {productsWithQuanty?.reduce(
            (acc, product) => acc + product.quantity! * product.price,
            0
          )}
        </span>
      </div>
    </div>
  );
}
