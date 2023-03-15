import React from "react";
import bv from "./bv.mp4";

function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        minWidth: "100%",
        minHeight: "100%",
        zIndex: -1,
      }}
    >
      <source src={bv} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default BackgroundVideo;
