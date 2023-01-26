import searchIcon from "../../assets/search.png";
export default function Search() {
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
        className="searchicon"
        style={{
          backgroundColor: "#febd69",
          height: "100%",
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 12px",
        }}
      >
        <img style={{ width: "18px" }} src={searchIcon} alt="" />
      </div>
    </div>
  );
}
