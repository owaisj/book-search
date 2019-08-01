import React, { useEffect, useState } from 'react';
import BookTile from '../components/BookTile';
import { Link } from 'react-router-dom';

export default function Saved() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    const response = await fetch('/api/books', {
      method: 'GET'
    });
    const data = await response.json();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [loading]); // Dependency Array

  const refresh = () => {
    setLoading(true);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Saved Books</h1>
        <h2 className="subtitle">View or remove your books</h2>
        <div className="columns">
          <div className="column is-half-tablet is-one-third-desktop is-full-mobile">
            <p>Search for books and save them to your reading list.</p>
            <Link to="/">Go Home</Link>
          </div>
          <div className="column columns is-half-tablet is-one-third-desktop is-full-mobile">
            {!loading ? '' : <div className="column">Loading Books</div>}
            <div className="column">
              <button
                className="button"
                onClick={() => {
                  setLoading(true);
                  console.log(books);
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
        <div className="columns is-multiline">
          {books.map((book, i) => {
            return (
              <BookTile
                dbID={book._id}
                title={book.title}
                authors={book.authors.join(', ')}
                gLink={book.link}
                image={book.image}
                description={book.description}
                page={'Saved'}
                deleteTrigger={refresh}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
