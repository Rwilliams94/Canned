import React, { Component } from "react";
import apiHandler from "../API/apiHandler";
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

    apiHandler.searchBreweries(this.state.search).then((response) => {
      this.setState({
        results: response,
        isLoading: false,
      });
    });
  };

  handleBreweryClicked(brewery) {
    this.setState({
      search: brewery.name,
      results: [],
    });
    console.log(this.props);
    this.props.onSelect(brewery); 
  }

  render() {

    return (
      <div className="searchBrew__box">
        <h2>SearchBrew</h2>
        <input
          className="searchBrew__bar"
          type="text"
          value={this.state.search}
          onChange={this.handleSearch}
          name="searchBrew"
          id="searchBrew"
        />
        <ul className="searchBrew__results">
          {this.state.results.map((brewery) => (
            <li
              key={brewery._id}
              className="searchBrew__list-item"
              onClick={() => this.handleBreweryClicked(brewery)}
            >
              <h4>{brewery.name}</h4>
            </li>
          ))}
          {this.state.isLoading && (
            <li className="searchBrew__list-item">Brewery hunting...</li>
          )}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
