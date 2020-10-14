import React, { useState, useEffect } from 'react';
import './Frames.css';
import { setCanvasFrame } from '../actions';
import { connect } from 'react-redux';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const framesImages = [
  {
    thumbUrl:
      "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/frames/637371217168355192_thumb.png",
    imageUrl:
      "/frames/frame_01.png",
  },
  {
    thumbUrl:
      "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/frames/637371217168824703_thumb.png",
    imageUrl:
      "/frames/frame_02.png",
  },
  {
    thumbUrl:
      "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/frames/637371303055003947_thumb.png",
    imageUrl:
      "/frames/frame_03.png",
  },
  {
    thumbUrl:
      "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/frames/637371303144070128_thumb.png",
    imageUrl:
      "/frames/frame_04.png",
  },
];

const Frames = ({setCanvasFrame, counter}) => {
  const [image, setImage] = useState(framesImages[0].imageUrl);

    useEffect(() => {
        setCanvasFrame(image); 
    });   

    const onChangeFrame = (image) => {
        setImage(image);
        setCanvasFrame(image);
    } 

    const renderFrames = framesImages.map((frameImage, index) => {
        return (
            <button
                key={`button${index}`}
                className="frames__button item"
                onClick={() => onChangeFrame(frameImage.imageUrl)}
            >
                <img src={frameImage.thumbUrl} alt="frame" />
            </button>
            
        );
    });

  return (
    <div className="frames">
      <h3>Choose a frame</h3>
      <div className="frames__carousel">
        <OwlCarousel dots={false} nav>
          {renderFrames}
        </OwlCarousel>
      </div>
      <button className="frames__button" onClick={() => counter()}>Start</button>
    </div>
  );
}

export default connect(null ,{
  setCanvasFrame
})(Frames);
