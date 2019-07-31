import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  handleInputChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.search(this.state.value);
  };
  clearForm = event => {
    event.preventDefault();
  };
  render() {
    return (
      <form>
        <div className="field">
          <label className="label">Search</label>
          <input
            className="input"
            type="text"
            value={this.state.value}
            placeholder="Search for a book"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="field is-grouped">
          <div className="control columns is-centered">
            <div className="column">
              <button
                type="submit"
                className="button"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className="column">
              <button className="button" disabled>
                Clear!
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
