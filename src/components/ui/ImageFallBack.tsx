import React from "react";

function ImageFallBack({ w = "100%", h = "300px" }) {
  return (
    <div
      style={{
        width: w,
        height: h,
      }}
      className="bg-gray-900/80"
    ></div>
  );
}

export default ImageFallBack;
