import React from "react";
import dangericon from "../assets/warning.png";
import error404 from "../assets/error-404.png";
export default function Error({
  code,
  message,
}: {
  message: string;
  code?: 404;
}) {
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
      <img
        style={{ width: "55px", marginBottom: code ? "15px" : 0 }}
        src={code ? error404 : dangericon}
        alt=""
      />
      <h4>{message}</h4>
    </div>
  );
}
