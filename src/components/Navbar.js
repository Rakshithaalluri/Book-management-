import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Book Management</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/search" className="navbar-link">Search Books</Link>
          <Link to="/add-book" className="navbar-link">Add Book</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
