import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookTile from '../components/BookTile';
import SearchForm from '../components/SearchForm';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearched: false,
      query: 'Ready Player One',
      data: []
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}`
    );
    const data = await response.json();
    this.setState({
      data: data.items.filter(
        item =>
          item.volumeInfo.title &&
          item.volumeInfo.infoLink &&
          item.volumeInfo.authors &&
          item.volumeInfo.description &&
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.thumbnail
      ),
      isSearched: true
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}`
      );
      const data = await response.json();
      this.setState({
        data: data.items.filter(
          item =>
            item.volumeInfo.title &&
            item.volumeInfo.infoLink &&
            item.volumeInfo.authors &&
            item.volumeInfo.description &&
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.thumbnail
        ),
        isSearched: true
      });
    }
  }

  grabValue = term => {
    console.log(term);
    this.setState({
      query: term
    });
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Main Page</h1>
          <h2 className="subtitle">Welcome home.</h2>
          <div className="columns">
            <div className="column is-half-tablet is-one-third-desktop is-full-mobile">
              <p>Search for books and save them to your reading list.</p>
              <Link to="/saved">View Saved Books</Link>
            </div>
            <div className="column is-half-tablet is-one-third-desktop is-full-mobile">
              <SearchForm search={this.grabValue} />
            </div>
          </div>
          {!this.state.isSearched ? (
            <p>Loading</p>
          ) : (
            <div className="columns is-multiline">
              {this.state.data.map((book, i) => {
                const current = book.volumeInfo;
                return (
                  <BookTile
                    title={current.title}
                    authors={current.authors.join(', ')}
                    gLink={current.previewLink}
                    image={current.imageLinks.thumbnail}
                    description={current.description}
                    page={'Main'}
                    key={i}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }
}
