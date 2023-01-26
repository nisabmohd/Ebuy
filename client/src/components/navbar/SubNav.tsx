import React from "react";

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
      }}
    >
      <p style={{ marginLeft: "28px" }}>Groceries</p>
      <p>Mobile</p>
      <p>Fashion</p>
      <p>Electronics</p>
      <p>Home</p>
      <p>Appliances</p>
      <p></p>
      <p></p>
    </div>
  );
}
