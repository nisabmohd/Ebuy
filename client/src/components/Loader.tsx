import React from "react";
import gif from "../assets/loader.gif";
export default function Loader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "3vh",
        height: "95px",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <img style={{ width: "28px" }} src={gif} alt="" />
      <h4>Loading</h4>
    </div>
  );
}
