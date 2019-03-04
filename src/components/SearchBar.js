import React, { Component } from "react";

class SearchBar extends Component {
  state = { term: "" };

  onInputChange = event => {
    this.setState({ term: event.target.value.replace(/\s/g, "") });
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.term);
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="ui form">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">
              https://steemit.com/created/
            </span>
          </div>
          <input
            className="form-control"
            type="text"
            name="tag"
            value={this.state.term}
            onChange={this.onInputChange}
          />
        </div>
      </form>
    );
  }
}

export default SearchBar;
