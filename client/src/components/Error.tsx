import React from "react";
import dangericon from "../assets/warning.png";
export default function Error() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "95px",
        paddingTop: "3vh",
      }}
    >
      <img style={{ width: "55px" }} src={dangericon} alt="" />
      <h4>Something went wrong</h4>
    </div>
  );
}
