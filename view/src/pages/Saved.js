import React, { useEffect, useState } from 'react';
import BookTile from '../components/BookTile';

/*
  TODO: Button next to link should either be SAVE or REMOVE depending on what page it's displayed
*/
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
      {!loading ? 'Book Tile Map' : 'Loading Books'}
      <button
        className="button"
        onClick={() => {
          setLoading(true);
          console.log(books);
        }}
      >
        Refresh
      </button>
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
    </section>
  );
}
