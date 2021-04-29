import React from "react";
import Tilt from "react-tilt";
import Face from "./logo.png";
import "./logo.css";
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 60 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img class="face" src={Face} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
