import React from 'react';
import './LikeButtons.css';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const LikeButtons = ({ onRetake, setStrip, stripString ="photoStickers"}) => {
    return (
      <div className="likeButtons">
        <h3>Great shot</h3>
        <ul className="likeButtons__list">
          <li className="likeButtons__option">
            <button onClick={(e) => onRetake()}>
              <ThumbDownIcon />
            </button>
            <span>Retake</span>
          </li>
          <li className="likeButtons__option">
            <button onClick={() => setStrip(stripString)}>
              <ThumbUpIcon />
            </button>
            <span>I like it</span>
          </li>
        </ul>
      </div>
    );
}

export default LikeButtons;
