import React from "react";

export default function Footer(): JSX.Element {
  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        bottom: "15px",
        fontFamily: "poppins",
        fontSize: "12px",
        fontWeight: "lighter",
      }}
    >
      {new Date().getFullYear()}, ebuy.vercel.app, Inc. or its affiliates
    </div>
  );
}
