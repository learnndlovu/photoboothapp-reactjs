import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
      <div className="home">
        <h2 className="home__title text--center">Virtual Photobooth</h2>
        <p className="home__quote text--center">
          "Photography is a way of feeling, of touching, of loving. What you
          have caught on film is captured forever... it remembers little things,
          long after you have forgotten everything."
        </p>
        <p className="home__author text--center">
            -Learn Ndlovu
        </p>
        <Link to="/snap" className="home__snap__button">Take a Snap!</Link>
      </div>
    );
}

export default Home;
