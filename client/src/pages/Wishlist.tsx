import HoizontalCard from "../components/product/HoizontalCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../url";
import { ProductType } from "./Products";
import { useShopping } from "../contexts/ShoppingContext";

export default function Wishlist() {
  const { wishListItems } = useShopping();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "55%",
        margin: "auto",
        padding: "38px 0",
      }}
    >
      <h3>Your Wishlist</h3>
      <div
        className="products_hor_card"
        style={{ display: "flex", flexDirection: "column", paddingTop: "28px" }}
      >
        {wishListItems.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "18px" }}>
            Nothing found here.
          </h5>
        )}
        {wishListItems.map((item: ProductType) => {
          return (
            <HoizontalCard
              discountedPrice={item.discountedPrice}
              orignalprice={item.orignalPrice}
              image={item.image}
              productId={item._id}
              name={item.name}
              ratings={item.ratings}
              reviewCount={item.reviews}
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}
