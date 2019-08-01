import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  handleInputChange = event => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.search(this.state.value);
  };
  clearForm = event => {
    event.preventDefault();
    this.setState({ value: '' });
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
          <div className="control columns is-centered is-mobile">
            <div className="column is-half-mobile">
              <button
                type="submit"
                className="button"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className="column is-half-mobile">
              <button className="button" onClick={this.clearForm}>
                Clear!
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
