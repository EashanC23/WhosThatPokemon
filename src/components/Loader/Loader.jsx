import React from "react";
import "./Loader.css";

function Loader(props) {
  return (
    <div className="loader">
      <img src="../../../dist/pokeball.png" style={{maxWidth: props.width}} alt="loading" className="loader-image" />
    </div>
  );
}

export default Loader;

