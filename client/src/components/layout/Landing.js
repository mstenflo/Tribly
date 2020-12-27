import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Share your project</h1>
          <p className="lead">
            Form a group, create projects, get feedback, and inspire.
          </p>
          <div>
            <Link to="/register" className="btn btn-yellow">Sign up</Link>
            <Link to="/login" className="btn btn-light">Log in</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
