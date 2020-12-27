import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          tribly
        </Link>
      </h1>
      <ul>
        <li><Link to="/login">Log in</Link></li>
        <li><Link to="/register">Sign up</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
