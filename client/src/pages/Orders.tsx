import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../url";

export default function Orders() {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/myorders`),
    queryKey: ["myorders"],
  });
  return (
    <div
      style={{
        width: "85%",
        borderLeft: "1px solid #f6f6f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5vh 0",
        minHeight: "75vh",
      }}
    >
      <h3>My Orders</h3>
      {data?.data.length === 0 && !isLoading && (
        <p style={{ marginTop: "6vh" }}>Nothing to see here.</p>
      )}
      {data?.data?.map((item: any) => (
        <pre>{JSON.stringify(item)}</pre>
      ))}
    </div>
  );
}
