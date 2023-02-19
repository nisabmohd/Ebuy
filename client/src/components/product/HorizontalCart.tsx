import {} from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  CartItemsType as CartItemCard,
  useShopping,
} from "../../contexts/ShoppingContext";
import Rating from "@mui/material/Rating";
import IncDec from "./IncDec";

export default function HorizontalCart({
  discountedPrice,
  image,
  name,
  ratings,
  _id,
  brand,
  orignalPrice,
  quantity,
  reviews,
}: CartItemCard) {
  const { decrementQuantity, incrementQuantity } = useShopping();
  return (
    <div style={{ position: "relative" }}>
      <Link
        to={`/product/${_id}`}
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
          <h4 style={{ marginTop: "14px", marginRight: "85px" }}>{name}</h4>
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
                <p style={{ fontSize: "12.5px" }}>({reviews})</p>
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
              ₹{orignalPrice}{" "}
            </p>
            <p style={{ fontSize: "13.5px" }}>
              {(
                ((orignalPrice - discountedPrice) * 100) /
                discountedPrice
              ).toFixed(0)}
              % off
            </p>
          </div>
        </div>
      </Link>
      <div style={{ position: "absolute", top: "13.25px", right: "12px" }}>
        <IncDec
          quantity={quantity}
          inc={incrementQuantity}
          dec={decrementQuantity}
          id={_id}
        />
      </div>
    </div>
  );
}
