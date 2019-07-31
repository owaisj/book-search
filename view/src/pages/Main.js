import React, { Component } from 'react';
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
    this.setState({ data: data.items, isSearched: true });
    console.log(this.state);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}`
      );
      const data = await response.json();
      this.setState({ data: data.items, isSearched: true });
      // console.log(this.state);
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
            <div className="column is-one-third">
              <p>Search for books and save them to your reading list.</p>
            </div>
            <div className="column is-one-third">
              <SearchForm search={this.grabValue} />
            </div>
          </div>
          {!this.state.isSearched ? (
            <p>Loading</p>
          ) : (
            <div className="columns is-multiline">
              {this.state.data.map((book, i) => {
                console.log(book.volumeInfo);
                const current = book.volumeInfo;
                return (
                  <BookTile
                    title={current.title}
                    authors={current.authors.join(', ')}
                    gLink={current.previewLink}
                    image={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : 'https://www.fillmurray.com/460/300'
                    }
                    description={current.description}
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
