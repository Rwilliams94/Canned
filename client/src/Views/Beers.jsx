import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../API/apiHandler";
import Rating from "../Components/Rating"
import '../Styles/Beer.css'
// import SearchBar from './SearchBar';

export class Beers extends Component {
  state = {
    beers: null,
    sendBeer: [],
    popUp: false,
    rankedBeer: null,
    normList: true,


  };

  componentDidMount() {
    apiHandler
      .getBeers()
      .then((response) => {

        const list = [...response]
        this.setState({beers: list});

        const ranked = response.sort((a,b) => {
          return b.rating - a.rating
        })
        this.setState({ rankedBeer: response })
      })
      .catch((err) => console.log(err));
  }

  handleListNormal = () => {
      this.setState({normList: true})
  }

  handleListRanked = () => {
    this.setState({normList: false})
}



  render() {

    if (this.state.beers === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    const listType = this.state.normList ? this.state.beers : this.state.rankedBeer

    return (
      <div className="beer__main-list">

        <div className="beer__list-type">
          <div onClick={this.handleListNormal} className="beer__list-switch"><h2>Latest</h2></div>
          <div onClick={this.handleListRanked} className="beer__list-switch"><h2>Top rated</h2></div>
        </div>
        <ul className="beer__list">
          {listType.map((beer) => (
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
                <Rating rating={beer.rating} />
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
