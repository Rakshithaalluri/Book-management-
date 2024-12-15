import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Book Management System</h1>
      <form onSubmit={handleSearch} className="home-form">
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books by title, author, or genre"
          className="home-input"
        />
        <button 
          type="submit" 
          className="home-button"
        >
          Search Books
        </button>
      </form>
      <p className="home-footer">Manage your library efficiently and professionally.</p>
    </div>
  );
}

export default Home;
