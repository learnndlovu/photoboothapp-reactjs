import React from 'react';
import ReactDOM from 'react-dom';
import './ProgressCircle.css';
import ProgressBar from 'react-progress-bar.js';

const progressCircle = ({ progress }) => {
    const Circle = ProgressBar.Circle;
    const options = {
      strokeWidth: 4,
      color: "#ffffff",
      trailWidth: 0.5,
    };

    return ReactDOM.createPortal(
      <div className="progressCircle">
        <div className="progressCircle__container">
          <Circle
            progress={progress}
            text={`${Math.floor(progress * 100)}%`}
            options={options}
          />
        </div>
      </div>,
      document.querySelector('#modal')
    );
}

export default progressCircle;
