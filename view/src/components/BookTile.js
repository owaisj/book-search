// Stateless Functional Component
import React from 'react';

export default function BookTile(props) {
  return (
    <div className="column is-half">
      <div className="box">
        <p className="title">{props.title}</p>
        <p className="subtitle">By {props.authors}</p>
        <div className="columns">
          <div className="column">
            <figure className="image">
              <img src={props.image} alt="placeholder" />
            </figure>
          </div>
          <div className="column is-two-thirds">
            <p className="is-size-7 book-description">{props.description}</p>
          </div>
        </div>
        <p>
          <a href={props.gLink} className="button is-link">
            <span className="fa fa-google" />
          </a>{' '}
          <button className="button is-success" disabled>
            Save
          </button>
        </p>
      </div>
    </div>
  );
}
