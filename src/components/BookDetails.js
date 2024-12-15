import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import './BookDetails.css';


function BookDetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await bookService.getBookById(id);
        setBook(bookData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="container">
    <h2 className="title">{book.Title}</h2>
    <div className="grid">
      <div>
        <p><strong>Author:</strong> {book.AuthorName}</p>
        <p><strong>Genre:</strong> {book.GenreName}</p>
        <p><strong>Pages:</strong> {book.Pages}</p>
        <p><strong>Published Date:</strong> {new Date(book.PublishedDate).toLocaleDateString()}</p>
      </div>
      <div className="buttons">
        <Link 
          to={`/edit-book/${id}`} 
          className="button edit-button"
        >
          Edit Book
        </Link>
        <button 
          onClick={handleDelete} 
          className="button delete-button"
        >
          Delete Book
        </button>
      </div>
    </div>
  </div>
  );
}

export default BookDetails;