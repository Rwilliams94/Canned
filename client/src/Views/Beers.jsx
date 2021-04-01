import React, { Component } from "react";
// import { Link } from "react-router-dom";
import apiHandler from "../API/apiHandler";
// import Rating from "../Components/Rating"
import BeerList from '../Components/Beers/BeerList'
import withUser from "../Components/Auth/withUser";
import SearchBar from '../Components/SearchBar'
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

        list.sort((a,b)=> {
          return b.releasedate - a.releasedate
        })

        this.setState({beers: list});

        response.sort((a,b) => {
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

handleLogout = () => {
  const { context } = this.props;

  apiHandler
    .logout()
    .then(() => {
      context.removeUser();
      this.props.history.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};


  render() {

    if (this.state.beers === null) {
      return <div>One sec, just heading to the bar...</div>;
    }

    const listType = this.state.normList ? this.state.beers : this.state.rankedBeer

    return (
      <div className="beer__main-list">

        <SearchBar/>
        <div className="beer__list-type">
          <div onClick={this.handleListNormal} className={`${this.state.normList ? "" : "active"} flex-center beer__list-switch`}><h2 className="thin">Latest</h2></div>
          <div onClick={this.handleListRanked} className={`${this.state.normList ? "active" : ""} flex-center beer__list-switch`}><h2 className="thin">Top rated</h2></div>
        </div>
        
        <BeerList beerList={listType}/>
      </div>
    );
  }
}

export default withUser(Beers);
