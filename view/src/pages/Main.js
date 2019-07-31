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
      console.log(this.state);
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
          <SearchForm search={this.grabValue} />
          {!this.state.isSearched ? (
            <p>Loading</p>
          ) : (
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                {[1, 2, 3].map((book, i) => (
                  <BookTile key={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
