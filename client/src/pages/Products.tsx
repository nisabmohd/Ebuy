import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Card from "../components/product/Card";
import Category from "../components/product/Category";

type ProductType = {
  _id: string;
  name: string;
  brand: string;
  image: string;
  discountedPrice: number;
  reviews: number;
  ratings: number;
  orignalPrice: number;
};

export default function Products() {
  const [query] = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  const { isError, isLoading } = useQuery({
    queryFn: () => Promise.reject(),
    enabled: query.get("category") != null,
    queryKey: [
      "products",
      "category",
      query.get("category"),
      query.get("page"),
      query.get("sortby"),
      query.get("ratings"),
      query.get("price"),
      query.get("low"),
      query.get("high"),
    ],
    onSuccess(res) {
      // setproducts()
    },
  });

  const { isError: errSearch, isLoading: loadSearch } = useQuery({
    queryFn: () => Promise.reject(),
    enabled: query.get("search") != null,
    queryKey: [
      "products",
      "search",
      query.get("search"),
      query.get("page"),
      query.get("sortby"),
      query.get("ratings"),
      query.get("price"),
      query.get("low"),
      query.get("high"),
    ],
    onSuccess(res) {
      // setproducts()
    },
  });

  function handleCustomisation({
    sortby,
    ratings,
    price,
  }: {
    sortby?: string;
    ratings?: number;
    price?: { low?: number; high?: number };
  }) {
    const isSearch = !query.get("category");
    let url = `/products?${!isSearch ? "category" : "search"}=${
      isSearch ? query.get("search") : query.get("category")
    }&page=${query.get("page") ?? 1}`;
    if (sortby || query.get("sortby"))
      if (sortby != "-1") url += `&sortby=${sortby ?? query.get("sortby")}`;
    if (ratings || query.get("ratings"))
      if (ratings != -1) url += `&ratings=${ratings ?? query.get("ratings")}`;
    if (price || query.get("price"))
      url += `&price=${true}&low=${price?.low ?? query.get("low")}&high=${
        price?.high ?? query.get("high")
      }`;
    // console.log(url);
    navigate(url);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "85%",
        margin: "auto",
        padding: "18px 0",
      }}
    >
      <Category
        handleCustomisation={handleCustomisation}
        sortby={query.get("sortby")}
        ratings={
          query.get("ratings") != null ? parseInt(query.get("ratings")!) : null
        }
        price={{
          low: query.get("low") != null ? parseInt(query.get("low")!) : 500,
          high:
            query.get("high") != null ? parseInt(query.get("high")!) : 10000,
        }}
      />
      <div className="right" style={{ width: "100%" }}>
        {((isLoading && query.get("category") != undefined) ||
          (loadSearch && query.get("search") != undefined)) && <Loader />}
        {(isError || errSearch) && <Error />}
        {products.length != 0 && (
          <>
            <h3 style={{ margin: "15px 0 " }}>RESULTS</h3>
            <div
              className="products_view"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr",
                gap: "14px",
              }}
            >
              {products.map((item) => {
                return (
                  <Card
                    discountedPrice={item.discountedPrice}
                    orignalprice={item.orignalPrice}
                    name={item.name}
                    ratings={item.ratings}
                    reviewCount={item.reviews}
                    image={item.image}
                    productId={item._id}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
