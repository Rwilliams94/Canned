import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rating from '../Components/Rating'
import apiHandler from "../API/apiHandler";
// import SearchBar from './SearchBar';

export class Beers extends Component {
  state = {
    beers: null,
    sendBeer: [],
    popUp: false,
  };

  componentDidMount() {
    apiHandler
      .getUserBeers()
      .then((response) => {
        // console.log(response);
        this.setState({ beers: response });
      })
      .catch((err) => console.log(err));
  }

  render() {

    if (this.state.beers === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    return (
      <div className="beer__main-list">
        <ul className="beer__list">
          {this.state.beers.map((beer) => (
            <li className="beer__list-item" key={beer._id}>
              <div className="beer__box">
                <div className="beer__image-box">
                  <img
                    className="beer__image"
                    src={beer.image}
                    alt={beer.name}
                  />
                </div>
                <div className="beer__info">
                <Link exact to={`/beer-detail/${beer._id}`}>
                  <h3>{beer.name}</h3>
                </Link>
                <h4>{beer.breweryname}</h4>
                <Rating rating={beer.rating}/>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Beers;
