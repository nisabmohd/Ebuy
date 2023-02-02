import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/search.png";
export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleNavigate() {
    if (!query) return;
    navigate(`/products?search=${query}`);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "35%",
        backgroundColor: "#ffff",
        height: "42px",
        borderRadius: "4px",
        alignItems: "center",
        overflow: "hidden",
        paddingLeft: "8px",
      }}
    >
      <input
        onKeyDown={(e) => e.keyCode == 13 && handleNavigate()}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search products"
        style={{
          height: "95%",
          width: "93%",
          backgroundColor: "transparent",
          outline: "none",
          marginLeft: "6px",
          border: "none",
          fontSize: "14px",
          fontWeight: "500",
        }}
      />
      <div
        onClick={() => handleNavigate()}
        className="searchicon"
        style={{
          backgroundColor: "#febd69",
          height: "100%",
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 12px",
          cursor: query ? "pointer" : "not-allowed",
        }}
      >
        <img style={{ width: "18px" }} src={searchIcon} alt="" />
      </div>
    </div>
  );
}
