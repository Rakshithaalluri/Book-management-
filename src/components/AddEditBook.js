import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import './AddEditBook.css';

function AddEditBook({ mode }) {
  const [bookData, setBookData] = useState({
    title: '',
    authorName: '',
    genreName: '',
    pages: '',
    publishedDate: ''
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit') {
      const fetchBook = async () => {
        try {
          const book = await bookService.getBookById(id);
          setBookData({
            title: book.Title,
            authorName: book.AuthorName,
            genreName: book.GenreName,
            pages: book.Pages,
            publishedDate: book.PublishedDate
          });
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };
      fetchBook();
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'add') {
        await bookService.addBook(bookData);
      } else {
        await bookService.updateBook(id, bookData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
    <h2 className="title">
      {mode === 'add' ? 'Add New Book' : 'Edit Book'}
    </h2>
    <form onSubmit={handleSubmit} className="form">
      <div className="input-group">
        <label className="label">Title</label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-group">
        <label className="label">Author</label>
        <input
          type="text"
          name="authorName"
          value={bookData.authorName}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-group">
        <label className="label">Genre</label>
        <input
          type="text"
          name="genreName"
          value={bookData.genreName}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-group">
        <label className="label">Pages</label>
        <input
          type="number"
          name="pages"
          value={bookData.pages}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-group">
        <label className="label">Published Date</label>
        <input
          type="date"
          name="publishedDate"
          value={bookData.publishedDate}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="button"
      >
        {loading ? 'Saving...' : (mode === 'add' ? 'Add Book' : 'Update Book')}
      </button>
    </form>
  </div>
  );
}

export default AddEditBook;