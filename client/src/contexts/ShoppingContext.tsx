import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, ReactNode, useState } from "react";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { ProductType } from "../pages/Products";
import { url } from "../url";
import { useAuth } from "./AuthContext";

type ContextValueType = {
  addToCart: (item: ProductType) => void;
  removeFromCart: (id: string) => void;
  includesInWishList: (id: string) => boolean;
  wishListItems: ProductType[];
  cartItems: ProductType[];
};
const Context = createContext<ContextValueType | undefined>(undefined);
export function useShopping() {
  return useContext(Context) as ContextValueType;
}

export default function ShoppingContext({ children }: { children: ReactNode }) {
  const [cartItems, setcartItems] = useState<ProductType[]>([]);
  const [wishListItems, setwishListItems] = useState<ProductType[]>([]);
  const { isAuthenticated } = useAuth();
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
  function addToCart(item: ProductType) {
    setcartItems((prev) => [...prev, item]);
  }
  function removeFromCart(id: string) {
    setcartItems((prev) => prev.filter((item) => item._id != id));
  }
  function includesInWishList(id: string) {
    const wishlistItem = wishListItems.find((item) => item._id == id);
    return wishlistItem != undefined;
  }
  const contextValue = {
    addToCart,
    removeFromCart,
    includesInWishList,
    wishListItems,
    cartItems,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
