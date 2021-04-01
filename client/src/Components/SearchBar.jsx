import React, { Component } from "react";
import apiHandler from "../API/apiHandler";
import { Link } from "react-router-dom";
import '../Styles/SearchBar.css'

export class SearchBar extends Component {
  state = {
    search: "",
    results: [],
    isLoading: false,
  };

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      isLoading: true,
    });

    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.performSearch();
    }, 1000);
  };

  performSearch = () => {
    if (this.state.search === "") {
      this.setState({
        results: [],
        isLoading: false,
      });
      return;
    }

    apiHandler
    .searchBeers(this.state.search)
    .then((response) => {
      this.setState({
        results: response,
        isLoading: false,
      });
    });
  };

  handleBeerClicked(beer) {
    this.setState({
      search: beer.name,
      results: [],
    });

    console.log(this.props);
    this.props.onSelect(beer); 
  }

  render() {
    return (
      <div className="search__box">
        <h2 className="thin">Search</h2>
        <input
          className="search__bar"
          type="text"
          value={this.state.search}
          onChange={this.handleSearch}
          name="search"
          id="search"
        />
        <ul className="search__results">
          {this.state.results.map((beer) => (
            <li
              key={beer._id}
              className="search__list-item"
            >
              <Link exact to={`/beer-detail/${beer._id}`}>
              <h4 className="thin">{beer.name} - {beer.breweryname}</h4>
              </Link>
            </li>
          ))}
          {this.state.isLoading && (
            <li className="search__list-item">Beer hunting...</li>
          )}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
