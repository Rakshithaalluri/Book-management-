import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { bookService } from '../services/api';
import './SearchResults.css';

function SearchResults() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('query') || '';
  
      const fetchBooks = async () => {
        try {
          const allBooks = await bookService.getAllBooks();
          const filteredBooks = allBooks.filter(book => 
            book.Title.toLowerCase().includes(query.toLowerCase()) ||
            book.AuthorName.toLowerCase().includes(query.toLowerCase()) ||
            book.GenreName.toLowerCase().includes(query.toLowerCase())
          );
          setBooks(filteredBooks);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching books:', error);
          setLoading(false);
        }
      };
  
      fetchBooks();
    }, [location.search]);
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="search-results-container">
        <h2 className="search-results-title">Search Results</h2>
        {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          <div 
            className={`search-results-grid ${
              books.length > 1 ? 'search-results-grid--multi-column' : 'search-results-grid--single-column'
            }`}
          >
            {books.map(book => (
              <div key={book.BookID} className="search-result-card">
                <h3>{book.Title}</h3>
                <p>Author: {book.AuthorName}</p>
                <p>Genre: {book.GenreName}</p>
                <Link 
                  to={`/book/${book.BookID}`} 
                  className="search-result-card-link"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default SearchResults;
  