// Stateless Functional Component
import React from 'react';

export default function BookTile(props) {
  const book = {
    title: props.title,
    authors: props.authors,
    description: props.description,
    image: props.image,
    link: props.gLink
  };

  // Used in BookTile rendered in Main page
  const saveToDb = () => {
    return fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  };

  // BookTile rendered on Saved
  const deleteFromDb = id => {
    console.log('Delete! ' + id);
    return fetch(`/api/books/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(output => props.deleteTrigger());
  };

  return (
    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
      <div className="box">
        <p className="title">{props.title}</p>
        <p className="subtitle">By {props.authors}</p>
        <div className="columns">
          <div className="column">
            <img src={props.image} alt="placeholder" />
          </div>
          <div className="column is-two-thirds">
            <p className="is-size-7 book-description">{props.description}</p>
          </div>
        </div>
        <p>
          <a
            href={props.gLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button is-link"
          >
            <span className="fa fa-google" />
          </a>{' '}
          {props.page === 'Main' ? (
            <button className="button is-success" onClick={saveToDb}>
              Save
            </button>
          ) : (
            <button
              className="button is-danger"
              onClick={() => deleteFromDb(props.dbID)}
            >
              <i className="fa fa-trash" />
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
