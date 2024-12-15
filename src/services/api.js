import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

export const bookService = {
  getAllBooks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getBookById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  addBook: async (bookData) => {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  },

  updateBook: async (id, bookData) => {
    const response = await axios.put(`${API_URL}/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};