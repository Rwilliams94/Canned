import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom'
import apiHandler from '../API/apiHandler'
import withUser from '../Components/Auth/withUser'
import '../Styles/BeerDetails.css'

export class BeerDetails extends Component {
  
  beerId = this.props.match.params.id;

    state = {
      user: null,
      beer: null,
      userBeers: null,
      alreadyDrunk: false,
    };


  componentDidMount() {
    const {context} = this.props
    const {user} = context


    this.setState({
      user: user,
      userBeers: user.beers
    })
  
    apiHandler
      .getOneBeer(this.beerId)
      .then((response) => {
        if (response.name === undefined) this.props.history.push("/*");
        this.setState({ beer: response });
      })
      .catch((err) => {
        console.log(err);
      });

      if (user.beers.includes(this.beerId)) {
        this.setState({alreadyDrunk: true})
      } 
      
  }

  handleAddBeer = () => {
    apiHandler
      .addUserBeer(this.beerId)
      .then(response => {
        console.log("success");
        this.setState({alreadyDrunk: !this.state.alreadyDrunk})
      })
      .catch(err => console.log(err))
  }

  handleRemoveBeer = () => {
    apiHandler
      .removeUserBeer(this.beerId)
      .then(response => {
        console.log("success");
        this.setState({alreadyDrunk: !this.state.alreadyDrunk})
      })
      .catch(err => console.log(err))
  }


  render() {
    
    if (this.state.user === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    if (this.state.beer === null) {
      return <div>One sec, just heading to the bar...</div>;
    }



    const beer = this.state.beer

    return (
      <div>
        <div className="details__box">
          <div className="details__image-box">
            <img
              className="details__image"
              src={beer.image}
              alt="beer"
            />
          </div>
          <div className="details__info-box">
            <h1>{beer.name}</h1>
            <h2>{beer.description}</h2>
            <div className="details__small-details">
              <p>{beer.abv}% ABV</p>
            </div>
            <Link
                exact
                to={`/beers/edit/${this.beerID}`}
                className="home__link"
              >
                <h3>Edit this beer</h3> 
            </Link>
              {this.state.alreadyDrunk ? 
              (<h3 onClick={this.handleRemoveBeer}>Canned!</h3>) : 
              (<h3 onClick={this.handleAddBeer}>Tried this one before?</h3> )}
        
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(BeerDetails);
