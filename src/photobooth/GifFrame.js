import React, { useEffect } from 'react';
import './GifFrame.css';
import { setCanvasFrame } from "../actions";
import { connect } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const gifFrameImages = [
    {
        imageUrl: "./frames/gif_frame_01.png"
    },
    {
        imageUrl: "./frames/gif_frame_02.png"
    }
]

const GifFrame = ({ setCanvasFrame, counter }) => {

    useEffect(() => {
        setCanvasFrame(gifFrameImages[0].imageUrl);
    });

    const renderFrames = gifFrameImages.map((frameImage, index) => {
        return (
            <button
                key={`button${index}`}
                className="frames__button item"
                onClick={() => setCanvasFrame(frameImage.imageUrl)}
            >
                <img src={frameImage.imageUrl} alt="frame" />
            </button>

        );
    });

    return (
        <div className="gifFrame">
            <h3>Choose a frame</h3>
            <div className="frames__carousel">
                <OwlCarousel dots={false} nav>
                    {renderFrames}
                </OwlCarousel>
            </div>
            <button onClick={(e) => counter()} className="gifFrame__button">Start</button>
        </div>
    );
};

export default connect(null, {
    setCanvasFrame,
})(GifFrame);
