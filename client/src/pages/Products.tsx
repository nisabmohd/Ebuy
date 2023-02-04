import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Card from "../components/product/Card";
import Category from "../components/product/Category";
import { url } from "../url";

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
  const [paginate, setPaginate] = useState<any>();
  const [currentPage, setCurrentPage] = useState(
    query.get("page") ? parseInt(query.get("page")!) : 1
  );
  const navigate = useNavigate();

  useEffect(() => {
    setProducts([]);
  }, [query]);

  const { isError, isLoading } = useQuery({
    queryFn: () =>
      axios.post(`${url}/product/query`, {
        category: query.get("category"),
        low: query.get("low"),
        high: query.get("high"),
        ratings: query.get("ratings"),
        sortby: query.get("sortby"),
        search: query.get("search"),
        page: query.get("page") ?? 1,
      }),
    queryKey: [
      "products",
      "category",
      query.get("category"),
      query.get("search"),
      query.get("page"),
      query.get("sortby"),
      query.get("ratings"),
      query.get("low"),
      query.get("high"),
    ],
    onSuccess(res) {
      // console.log(res.data);
      setPaginate({
        total: res.data.total,
        next: res.data.next,
        previous: res.data.previous,
      });
      const data = res.data.data.map(
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
      setProducts(data);
    },
  });

  function handleCustomisation({
    sortby,
    ratings,
    price,
    page,
  }: {
    sortby?: string;
    ratings?: number;
    price?: { low?: number; high?: number };
    page?: number;
  }) {
    setCurrentPage((prev) => page ?? prev);
    const isSearch = !query.get("category");
    let url = `/products?${!isSearch ? "category" : "search"}=${
      isSearch ? query.get("search") : query.get("category")
    }&page=${page ?? currentPage}`;
    if (sortby || query.get("sortby"))
      if (sortby != "-1") url += `&sortby=${sortby ?? query.get("sortby")}`;
    if (ratings || query.get("ratings"))
      if (ratings != -1) url += `&ratings=${ratings ?? query.get("ratings")}`;
    if (price || query.get("price"))
      url += `&low=${price?.low ?? query.get("low")}&high=${
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
        {isLoading && query.get("category") != undefined && <Loader />}
        {isError && <Error message="Something went wrong" />}
        {!isError && !isLoading && products.length == 0 && (
          <Error message="No products found" code={404} />
        )}
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
                    key={item._id}
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
            <div
              className="paginate"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5vh",
              }}
            >
              <Pagination
                count={paginate.total}
                page={currentPage}
                onChange={(e, v) => {
                  setCurrentPage(v);
                  handleCustomisation({ page: v });
                }}
                shape="rounded"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
