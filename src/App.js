import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import AddEditBook from './components/AddEditBook';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/add-book" element={<AddEditBook mode="add" />} />
            <Route path="/edit-book/:id" element={<AddEditBook mode="edit" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;