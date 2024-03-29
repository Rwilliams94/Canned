import React from 'react'
import { Link } from "react-router-dom";
import Rating from "../Rating"

const BeerList = (props) => {

    const beerList = props.beerList
    console.log(props);

    return (
        <div>
        <ul className="beer__list">
          {beerList.map((beer) => (
            <li className="beer__list-item flex-center" key={beer._id}>
              <Link exact to={`/beer-detail/${beer._id}`}>
                <div className="beer__box">
                  <div className="beer__image-box">
                    <img
                      className="beer__image"
                      src={beer.image}
                      alt={beer.name}
                    />
                  </div>
                  <div className="beer__info">
                    <h3>{beer.name}</h3>
                  <h4>{beer.breweryname}</h4>
                  <Rating rating={beer.rating} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        </div>
    )
}

export default BeerList
