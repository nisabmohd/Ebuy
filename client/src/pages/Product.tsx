import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { http } from "../interceptor/axiosInterceptor";
import { url } from "../url";

export default function Product() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: () => http.get(`${url}/product/${id}`),
    queryKey: ["product", id],
  });
  console.log(data);
  if (error) return "something went wrong";
  if (isLoading) return "Loading";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "65%",
        margin: "auto",
        padding: "38px 0",
      }}
    >
      <div
        className="actual_product_details"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: "8px",
          justifyContent: "space-between",
        }}
      >
        <div className="left_div_product">
          <div
            className="sameline"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "7%",
            }}
          >
            <div
              className="imageList"
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {data?.data.colors[0].images.map((img: string) => (
                <img
                  key={img}
                  src={img}
                  alt=""
                  style={{
                    width: "50px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
            <div className="selectedImage" style={{ margin: "0 2%" }}>
              <img
                style={{ width: "500px", marginLeft: "-22px" }}
                src={data?.data.colors[0].images[0]}
                alt=""
              />
            </div>
          </div>
          <div
            className="btnsbuy"
            style={{
              width: "inherit",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "5vh",
            }}
          >
            <button
              style={{
                width: "285px",
                height: "50px",
                marginRight: "12px",
                backgroundColor: "#febd69",
                outline: "none",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                border: "1px solid #d7d7d7",
                borderRadius: "4px",
              }}
            >
              Buy Now
            </button>
            <button
              style={{
                width: "285px",
                height: "50px",
                marginRight: "12px",
                outline: "none",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                border: "1px solid #d7d7d7",
                borderRadius: "4px",
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="product_details" style={{ width: "50%" }}>
          <div className="name">
            <h2 style={{ lineHeight: "32px" }}>{data?.data.name}</h2>
            <p style={{ marginTop: "8px", fontWeight: "bold", color: "gray" }}>
              {data!.data.brand}
            </p>
          </div>
          <div style={{ marginTop: "9px" }}>
            <Rating precision={0.1} value={3.4} readOnly></Rating>
          </div>
          <div className="pricing" style={{ marginTop: "12px" }}>
            <div
              className="sameline"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <p style={{ color: "red", fontSize: "20px" }}>
                -
                {(
                  100 -
                  (data?.data.discountedPrice * 100) / data?.data.originalPrice
                ).toFixed(0)}
                %
              </p>
              <h2>
                <span>₹</span>
                {data?.data.discountedPrice}
              </h2>
            </div>
            <p>
              MRP :{" "}
              <span
                style={{ fontSize: "15px", textDecoration: "line-through" }}
              >
                ₹{data?.data.originalPrice}
              </span>
            </p>
          </div>
          <div
            className="colors_option"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "28px",
            }}
          >
            <h5>Colour : Z20 Black</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "25px",
                marginTop: "10px",
              }}
            >
              {data?.data.colors.map(
                (color: { color: string; images: string[]; _id: string }) => {
                  return (
                    <div key={color._id}>
                      <img
                        style={{ width: "55px" }}
                        src={color.images[0]}
                        alt=""
                      />
                      <p style={{ fontSize: "12.5px" }}>{color.color}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="about" style={{ marginTop: "28px" }}>
            <h3>About this product</h3>
            <ul
              style={{
                listStylePosition: "outside",
                marginLeft: "15px",
                marginTop: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingTop: "9px",
              }}
            >
              {data?.data.highlights.map((item: string) => {
                return (
                  <li
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "lighter",
                      fontSize: "14px",
                    }}
                    key={item}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
