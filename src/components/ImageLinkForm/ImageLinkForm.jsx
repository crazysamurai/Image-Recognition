import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div class="imgForm">
      <p className="f3">
        This app will detect faces in your images. Give it a try!
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-5 form center">
          <input
            placeholder="Enter image link"
            className="link f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="detectBtn"
            // className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
