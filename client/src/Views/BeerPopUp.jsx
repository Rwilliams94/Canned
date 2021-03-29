import React, { Component } from "react";
import { Link } from 'react-router-dom'

export class BeerPopUp extends Component {

beer = this.props.id.data

state = {
  beer: this.beer,
};

  handleToggle = () => {
      this.props.toggle()
  }


  render() {

    if (this.state.beer === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    return (
      <div>
        <div className="details__box">
          <div className="details__image-box">
            <img
              className="details__image"
              src={this.state.beer.imageURL}
              alt="beer"
            />
          </div>
          <div className="details__info-box">
            <h1>{this.state.beer.name}</h1>
            <h2>{this.state.beer.description}</h2>
            <div className="details__small-details">
              <p>{this.state.beer.abv}% ABV</p>
            </div>
            <Link
                exact
                to={`/beers/edit/${this.beerID}`}
                className="home__link"
              >
                <h3>Edit this beer</h3> 
                </Link>
            <button onClick={this.handleToggle}>go back</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BeerPopUp;
