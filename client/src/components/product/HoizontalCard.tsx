import Rating from "@mui/material/Rating";
import { cardProps } from "./Card";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "../../interceptor/axiosInterceptor";
import { url } from "../../url";

export default function HoizontalCard({
  image,
  name,
  ratings,
  reviewCount,
  discountedPrice,
  orignalprice,
  productId,
}: cardProps) {
  const queryClient = useQueryClient();
  const { refetch } = useQuery({
    queryFn: () => httpRequest.put(`${url}/product/wishlist/${productId}`),
    queryKey: ["handlewishlist", productId],
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
  return (
    <div style={{ position: "relative" }}>
      <Link
        to={`/product/${productId}`}
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          margin: "auto",
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "18px",

          marginBottom: "14px",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div className="image">
          <img
            style={{ width: "140px", marginRight: "13px" }}
            src={image}
            alt=""
          />
        </div>
        <div className="details">
          <h4 style={{ marginTop: "14px", marginRight: "55px" }}>{name}</h4>
          <div
            className="ratings"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            {ratings != 0 && (
              <>
                <Rating
                  size="small"
                  name="read-only"
                  value={ratings}
                  precision={0.1}
                  readOnly
                />
                <p style={{ fontSize: "12.5px" }}>({reviewCount})</p>
              </>
            )}
          </div>
          <div
            className="price"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              marginTop: "6px",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              <span style={{ fontSize: "20px" }}>₹</span>
              {discountedPrice}
            </p>
            <p style={{ textDecoration: "line-through", fontSize: "16px" }}>
              ₹{orignalprice}{" "}
            </p>
            <p style={{ fontSize: "13.5px" }}>
              {(
                ((orignalprice - discountedPrice) * 100) /
                discountedPrice
              ).toFixed(0)}
              % off
            </p>
          </div>
        </div>
      </Link>
      <IconButton
        onClick={() => refetch()}
        style={{ position: "absolute", top: "3.55px", right: "12px" }}
      >
        {<DeleteOutlineIcon sx={{ fontSize: "20px", color: "black" }} />}
      </IconButton>
    </div>
  );
}
