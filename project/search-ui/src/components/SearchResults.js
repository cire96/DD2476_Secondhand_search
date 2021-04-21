import React, { Component } from "react";
import { render } from "react-dom";

class SearchResults extends Component {
  render() {
    const results = this.props.results;
    console.log(results)
    return (
      <div className="search_results">
        <hr />
        <ul>
          {results.map(result => {
            return (
              <li key={result._id}>
                {result._source.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchResults