import React, { useEffect } from 'react';
import './BoomerangFrame.css';
import { setCanvasFrame } from "../actions";
import { connect } from "react-redux";

const boomerangFrameImageUrl = [
    {
        imageUrl: "./frames/boomerang_frame.png"
    }
]

const BoomerangFrame = ({ setCanvasFrame, counter }) => {
  useEffect(() => {
    setCanvasFrame(boomerangFrameImageUrl[0].imageUrl);
  });

  return (
    <div className="boomerangFrame">
      <button onClick={() => counter()} className="boomerangFrame__button">Start</button>
    </div>
  );
};

export default connect(null, {
  setCanvasFrame,
})(BoomerangFrame);