import React from 'react';
import './Experiences.css';
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";

const Experiences = ({ setStrip }) => {

    return (
    <div className="experiences">
        <h3>Choose an experience</h3>
      <ul className="experiences__list">
        <li className="experiences__option">
          <button onClick={() => setStrip('photo')}>
            <PhotoCameraIcon />
          </button>
          <span>Photo</span>
        </li>
        <li className="experiences__option">
          <button onClick={() => setStrip('boomerang')}>
            <PlayCircleOutlineIcon />
          </button>
          <span>Boomerang</span>
        </li>
        <li className="experiences__option">
          <button onClick={() => setStrip('gif')}>
            <SlowMotionVideoIcon />
          </button>
          <span>Gif</span>
        </li>
      </ul>
    </div>
    );
}

export default Experiences;
