import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "../../interceptor/axiosInterceptor";
import { url } from "../../url";
import { useState } from "react";
import { useShopping } from "../../contexts/ShoppingContext";

export type cardProps = {
  productId: string;
  image: string;
  name: string;
  ratings: number;
  reviewCount: number;
  orignalprice: number;
  discountedPrice: number;
};

export default function Card({
  image,
  name,
  ratings,
  reviewCount,
  discountedPrice,
  orignalprice,
  productId,
}: cardProps) {
  const { includesInWishList } = useShopping();
  const [inWishlist, setInWishList] = useState(includesInWishList(productId));
  const queryClient = useQueryClient();
  const { refetch } = useQuery({
    queryFn: () => httpRequest.put(`${url}/product/wishlist/${productId}`),
    queryKey: ["handlewishlist", productId],
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      setInWishList((prev) => !prev);
    },
  });
  return (
    <Link
      to={`/product/${productId}`}
      style={{
        width: "300px",
        height: "450px",
        border: "1px solid #f0f0f0",
        borderRadius: "4px",
        textAlign: "center",
        textDecoration: "none",
        color: "inherit",
        position: "relative",
      }}
    >
      <div
        className="image"
        style={{
          height: "320px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            margin: "auto",
            maxHeight: "310px",
            objectFit: "cover",
          }}
          src={image}
          alt=""
        />
        {
          <div
            style={{ position: "absolute", top: "12px", right: "12px" }}
            onClick={(e) => {
              e.preventDefault();
              refetch();
            }}
          >
            <FavoriteIcon sx={{ color: inWishlist ? "red" : "#beb7b7" }} />
          </div>
        }
      </div>
      <p
        style={{
          width: "95%",
          margin: "auto",
          textAlign: "center",
          fontWeight: "bold",
          color: "#575757",
          marginTop: "10px",
        }}
      >
        {name.slice(0, 65) + "..."}
      </p>
      <div
        className="ratings"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          marginTop: "10px",
          justifyContent: "center",
        }}
      >
        {ratings != 0 && (
          <>
            <p style={{ fontSize: "14px" }}>{ratings}</p>
            <Rating size="small" name="read-only" value={ratings} readOnly />
          </>
        )}
        {reviewCount != 0 && (
          <p style={{ color: "#538193", fontSize: "14px" }}>({reviewCount})</p>
        )}
      </div>
      <div
        className="price"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: "8px",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "27px" }}>
          <span style={{ fontSize: "20px" }}>???</span>
          {discountedPrice}
        </p>
        <p style={{ textDecoration: "line-through", fontSize: "16px" }}>
          {" "}
          ???{orignalprice}{" "}
        </p>
        <p>
          {(((orignalprice - discountedPrice) * 100) / discountedPrice).toFixed(
            0
          )}
          % off
        </p>
      </div>
    </Link>
  );
}
