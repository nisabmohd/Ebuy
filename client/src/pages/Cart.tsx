import {} from "react";
import HorizontalCart from "../components/product/HorizontalCart";
import { useShopping } from "../contexts/ShoppingContext";

export default function Cart() {
  const { cartItems } = useShopping();
  return (
    <div
      className="sep_pages"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "55%",
        margin: "auto",
        padding: "38px 0",
      }}
    >
      <h3 style={{ marginBottom: "25px" }}>Your Cart Items</h3>
      {cartItems.map((item) => {
        return (
          <HorizontalCart
            _id={item._id}
            brand={item.brand}
            discountedPrice={item.discountedPrice}
            orignalPrice={item.orignalPrice}
            image={item.image}
            name={item.name}
            quantity={item.quantity}
            ratings={item.ratings}
            reviews={item.reviews}
            key={item._id}
          />
        );
      })}
    </div>
  );
}
