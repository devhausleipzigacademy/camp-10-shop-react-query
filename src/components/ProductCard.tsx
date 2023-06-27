import { Product, Sport } from "../types/products";
import React, { useContext, useState } from "react";
import {
  GiBasketballBall,
  GiTennisBall,
  GiRunningShoe,
  GiAmericanFootballBall,
  GiSportMedal,
} from "react-icons/gi";
import { BiSolidErrorCircle } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { HiCheckCircle, HiMinus, HiPlus } from "react-icons/hi";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, getCart, updateCart } from "../api/cart";
import CardBadge from "./CardBadge";
import axios from "axios";
import { updateProduct } from "../api/products";
import { useUnicornContext } from "../context/UnicornContext";

const sportIcon: Record<Sport, { icon: JSX.Element; color: string }> = {
  "american-football": {
    icon: <GiAmericanFootballBall />,
    color: "text-orange-950",
  },
  basketball: { icon: <GiBasketballBall />, color: "text-orange-600" },
  other: { icon: <GiSportMedal />, color: "text-blue-500" },
  running: { icon: <GiRunningShoe />, color: "text-purple-500" },
  tennis: { icon: <GiTennisBall />, color: "text-yellow-300" },
};

type Props = {
  product: Product;
};

type CartMutationData = {
  quantity: number;
  productId: number;
};

type ProductMutationData = {
  quantity: number;
  productId: number;
};

export function ProductCard({ product }: Props) {
  const { setUnicornNumber, unicornNumber } = useUnicornContext();
  const [quantity, setQuantity] = useState(0);
  const queryClient = useQueryClient();
  const { mutate, isError, isLoading, isSuccess, data } = useMutation(
    async (data: CartMutationData) => {
      const cart = await getCart();
      const cartItem = cart.find((item) => item.productId === data.productId);

      if (!cartItem) {
        return await addToCart({
          productId: data.productId,
          quantity: data.quantity,
        });
      }

      return await updateCart({
        productId: data.productId,
        quantity: data.quantity + cartItem.quantity,
        id: cartItem.id,
      });
    },
    {
      onSuccess: () => {
        setQuantity(0);
        toast("Added to cart!", {
          icon: <HiCheckCircle className="text-green-500" />,
        });
        queryClient.invalidateQueries(["cart"]);
      },
      onError: () => {
        toast("Something went wrong", {
          icon: <BiSolidErrorCircle className="text-red-500" />,
        });
      },
    }
  );

  const {
    isLoading: isLoadingProduct,
    isSuccess: isSuccessProduct,
    isError: isErrorProduct,
    data: dataProduct,
    mutate: mutateProduct,
  } = useMutation(
    async (data: ProductMutationData) => {
      const updatedProduct = await updateProduct(
        data.productId,
        product.stock - data.quantity
      );
      return updatedProduct;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
  console.log({
    isLoadingProduct,
    isSuccessProduct,
    isErrorProduct,
    dataProduct,
  });

  function incrementHandler() {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  function decrementHandler() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  async function addToCartHandler() {
    mutate({
      productId: product.id,
      quantity,
    });
    mutateProduct({
      productId: product.id,
      quantity,
    });
  }

  return (
    <div className="shadow-md rounded-md overflow-hidden flex flex-col">
      <Button onClick={() => setUnicornNumber(unicornNumber + 1)}>
        Count unicorns
      </Button>
      <div className="relative">
        {product.stock <= 3 && <CardBadge stockAmount={product.stock} />}
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square object-cover object-top w-full"
        />
        <span className="absolute bottom-4 right-4 font-bold text-2xl bg-slate-900/20 aspect-square flex items-center justify-center p-2 rounded-md backdrop-blur-md text-white">
          ${product.price}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <div className="flex gap-2 items-center mb-3">
            {React.cloneElement(sportIcon[product.sport].icon, {
              className: cn("w-6 h-6", sportIcon[product.sport].color),
            })}
            <span className="bg-slate-200 rounded-full px-2 py-0.5 text-sm">
              {product.category}
            </span>
          </div>
          <p>{product.description}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Button onClick={decrementHandler} variant="outline">
              <HiMinus />
            </Button>
            <span className="font-medium w-6 text-center">{quantity}</span>
            <Button onClick={incrementHandler} variant="outline">
              <HiPlus />
            </Button>
          </div>
          <Button
            onClick={addToCartHandler}
            className="flex-1"
            disabled={quantity === 0}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
