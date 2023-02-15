import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Review from "../components/product/Review";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../url";

export default function Product() {
  const { id } = useParams();
  const [productFetched, setProductFetched] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const { data, isLoading, error } = useQuery({
    queryFn: () => httpRequest.get(`${url}/product/${id}`),
    queryKey: ["product", id],
    onSuccess: (res) => {
      setProductFetched(true);
    },
  });

  const {
    data: reviews,
    isLoading: LoadingReviews,
    error: errReviews,
  } = useQuery({
    queryFn: () => httpRequest.get(`${url}/product/reviews/${id}`),
    queryKey: ["reviews", id],
    enabled: !productFetched,
  });
  function handleChangeColor(index: number) {
    setColorIndex(index);
  }
  if (error) return <Error message="Something went wrong" />;
  if (isLoading) return <Loader />;
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
          position: "static",
        }}
      >
        <div className="left_div_product" style={{}}>
          <div
            className="sameline_"
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
              {data?.data.colors[colorIndex].images.map(
                (img: string, index: number) => (
                  <img
                    key={img}
                    src={img}
                    alt=""
                    onClick={() => setSelectedImageIndex(index)}
                    style={{
                      width: "50px",
                      border:
                        selectedImageIndex === index
                          ? "2px solid rgb(254, 189, 105)"
                          : "1px solid #e5e5e5",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  />
                )
              )}
            </div>
            <div className="selectedImage" style={{ margin: "0 2%" }}>
              <img
                style={{ width: "400px", marginLeft: "-8px" }}
                src={data?.data.colors[colorIndex].images[selectedImageIndex]}
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
              marginTop: "8vh",
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

        <div
          className="product_details"
          style={{ width: "50%", marginLeft: "auto" }}
        >
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
            <h5>Colour : {data?.data.colors[0]?.color}</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "25px",
                marginTop: "10px",
              }}
            >
              {data?.data.colors?.map(
                (
                  color: { color: string; images: string[]; _id: string },
                  index: number
                ) => {
                  return (
                    <div key={color._id}>
                      <img
                        onClick={() => handleChangeColor(index)}
                        style={{
                          width: "55px",
                          border:
                            colorIndex == index
                              ? "2px solid rgb(254, 189, 105)"
                              : "1px solid #e5e5e5",
                          borderRadius: "5px",
                          marginBottom: "5px",
                          cursor: "pointer",
                        }}
                        src={color.images[0]}
                        alt=""
                      />
                      <p style={{ fontSize: "12.5px", textAlign: "center" }}>
                        {color.color}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {data?.data.sizes != undefined && (
            <div style={{ marginTop: "22px" }}>
              <h4 style={{ marginBottom: "12px" }}>Sizes</h4>
              <div
                className="sizes"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {data?.data.sizes.map((size: number) => (
                  <div
                    key={size}
                    style={{
                      border: "1px solid gray",
                      borderRadius: "6px",
                      height: "25px",
                      width: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontFamily: "Poppins",
                      textAlign: "center",
                    }}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

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
          <div className="highlightedImages" style={{ marginTop: "20px" }}>
            {data?.data.highlightedImages?.map((item: string) => {
              return (
                <img
                  style={{
                    width: "100%",
                    margin: "auto",
                    marginTop: "15px",
                    borderRadius: "15px",
                  }}
                  key={item}
                  src={item}
                  alt=""
                />
              );
            })}
          </div>
          <div className="ratings_view" style={{ marginTop: "35px" }}>
            {reviews?.data.length != 0 && (
              <h3 style={{ marginBottom: "20px" }}>Reviews</h3>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {reviews?.data?.map(
                (item: {
                  comment: string;
                  images: string[];
                  _id: string;
                  userId: string;
                  updatedAt: string;
                  username: string;
                  rating: number;
                }) => (
                  <Review
                    comment={item.comment}
                    images={item.images}
                    userId={item.userId}
                    timestamp={item.updatedAt}
                    rating={item.rating}
                    key={item._id}
                    username={item.username}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
