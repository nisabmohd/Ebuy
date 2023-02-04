import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    id: 1,
    category: "Mobile",
    url: "mobile",
  },
  {
    id: 2,
    category: "Fashion",
    url: "fashion",
  },
  {
    id: 3,
    category: "Electronics",
    url: "electronics",
  },
  {
    id: 4,
    category: "Groceries",
    url: "groceries",
  },
  {
    id: 5,
    category: "Home",
    url: "home",
  },
  {
    id: 6,
    category: "Appliance",
    url: "appliance",
  },
];
export default function SubNav() {
  return (
    <div
      style={{
        height: "32px",
        width: "100%",
        backgroundColor: "#232f3e",
        color: "white",
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        gap: "25px",
        fontSize: "14px",
        fontWeight: "bold",
        paddingLeft: "28px",
      }}
    >
      {CATEGORIES.map((category) => (
        <Link
          to={`/products?category=${category.url}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {category.category}
        </Link>
      ))}
    </div>
  );
}
