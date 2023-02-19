import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, ReactNode, useState, useMemo } from "react";
import { useAppContext } from "../App";
import useLocalStorage from "../hooks/useLocalStorage";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { ProductType } from "../pages/Products";
import { url } from "../url";
import { useAuth } from "./AuthContext";

export type CartItemsType = ProductType & {
  quantity: number;
};

type ContextValueType = {
  addToCart: (item: CartItemsType) => void;
  removeFromCart: (id: string) => void;
  includesInWishList: (id: string) => boolean;
  wishListItems: ProductType[];
  cartItems: CartItemsType[];
  decrementQuantity: (id: string) => void;
  incrementQuantity: (id: string) => void;
};

const insert = (
  arr: CartItemsType[],
  index: number,
  newItem: CartItemsType
) => [...arr.slice(0, index), newItem, ...arr.slice(index)];

const Context = createContext<ContextValueType | undefined>(undefined);
export function useShopping() {
  return useContext(Context) as ContextValueType;
}

export default function ShoppingContext({ children }: { children: ReactNode }) {
  const [cartItems, setcartItems] = useLocalStorage<CartItemsType[]>(
    "cart",
    []
  );
  const [wishListItems, setwishListItems] = useState<ProductType[]>([]);
  const { isAuthenticated } = useAuth();
  const { handleToast } = useAppContext();
  useQuery({
    queryFn: () => httpRequest.get(`${url}/user/wishlist`),
    queryKey: ["wishlist"],
    enabled: isAuthenticated,
    onSuccess: (res) => {
      const data = res.data.map(
        (item: {
          _id: string;
          name: string;
          brand: string;
          discountedPrice: number;
          originalPrice: number;
          reviews: [];
          rating: number;
          colors: [{ images: string }];
        }) => {
          return {
            _id: item._id,
            name: item.name,
            brand: item.brand,
            image: item.colors[0].images[0],
            discountedPrice: item.discountedPrice,
            orignalPrice: item.originalPrice,
            reviews: item.reviews.length,
            ratings: item.rating,
          };
        }
      );
      setwishListItems(data);
    },
  });
  function addToCart(item: CartItemsType) {
    if (!isAuthenticated)
      handleToast("Please login to add product in your cart", "error");
    const thatItem = cartItems.find(
      (cartItem) => cartItem._id === item._id && cartItem.image === item.image
    );
    const thatItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id && cartItem.image === item.image
    );
    let filtered = cartItems.filter(
      (cartItem) => cartItem._id !== item._id && cartItem.image !== item.image
    );
    console.log(thatItem, filtered, thatItemIndex);

    if (!thatItem) {
      filtered.push(item);
    } else {
      thatItem.quantity += 1;
      filtered = insert(filtered, thatItemIndex, thatItem);
    }
    setcartItems(filtered);
    handleToast("Added to cart", "success");
  }
  function removeFromCart(id: string) {
    setcartItems(cartItems.filter((item) => item._id != id));
    handleToast("Removed to cart", "success");
  }
  function decrementQuantity(id: string) {
    const thatItem = cartItems.find((cartItem) => cartItem._id === id);
    if (!thatItem) return;
    if (thatItem.quantity == 1) return removeFromCart(id);
    const filtered = cartItems.filter((cartItem) => cartItem._id !== id);
    thatItem.quantity -= 1;
    const thatItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === id
    );
    const result = insert(filtered, thatItemIndex, thatItem);
    setcartItems(result);
  }
  function incrementQuantity(id: string) {
    const thatItem = cartItems.find((cartItem) => cartItem._id === id);
    if (!thatItem) return;
    const filtered = cartItems.filter((cartItem) => cartItem._id !== id);
    thatItem.quantity += 1;
    const thatItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === id
    );
    const result = insert(filtered, thatItemIndex, thatItem);
    setcartItems(result);
  }
  function includesInWishList(id: string) {
    const wishlistItem = wishListItems.find((item) => item._id == id);
    return wishlistItem != undefined;
  }
  const contextValue = {
    addToCart,
    removeFromCart,
    decrementQuantity,
    incrementQuantity,
    includesInWishList,
    wishListItems,
    cartItems,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
