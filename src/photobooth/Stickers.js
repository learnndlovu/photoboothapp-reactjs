import React from 'react';
import './Stickers.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const stickers = [
    {
        imageUrl:
            "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/stickers/637371227507861524.png?v=6412",
    },
    {
        imageUrl:
            "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/stickers/637371227508017796.png?v=6412",
    },
    {
        imageUrl:
            "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/stickers/637371227508174063.png?v=6412",
    },
    {
        imageUrl:
            "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/stickers/637371227508330270.png?v=6412",
    },
    {
        imageUrl:
            "https://booth.snap.live/customers/lFQsUF157/ilFQ-QMhI/assets/stickers/637371227508486533.png?v=6412",
    },
];

const Stickers = ({ addSticker, setStrip }) => {

    const renderStickers = stickers.map((sticker, index) => {
        return (
            <button
                key={`button${index}`}
                className="stickers__button item"
                onClick={() => addSticker(sticker.imageUrl, index)}
            >
                <img src={sticker.imageUrl} alt="frame" />
            </button>
        );
    });

    return (
        <div className="stickers">
            <h3>Add some stickers</h3>
            <div className="stickers__carousel">
                <OwlCarousel dots={false} nav>
                    {renderStickers}
                </OwlCarousel>
            </div>
            <button onClick={() => setStrip("form")} className="stickers__button">Next</button>
        </div>
    );
}

export default Stickers;
