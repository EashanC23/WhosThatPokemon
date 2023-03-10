import React from "react"
import ImageFilter from "react-image-filter";
import "./Sprite.css"

function Sprite(props) {
  const filter = [
  1, 0, 0, 0, -1,
  0, 1, 0, 0, -1,
  0, 0, 1, 0, -1,
  0, 0, 0, 1, 0,
];

  return (
    <div>
        <image
          src={props.src}
          filter={filter}
        />
    </div>
  );
}

export default Sprite
