import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import apiHandler from "../API/apiHandler";
import withUser from '../Components/Auth/withUser'
import CreateBrewery from '../Components/Breweries/CreateBrewery'
import axios from 'axios'
// import BrewSearchBar from "../Components/BrewSearchBar";
import "../Styles/MapPage.css";



export class MapPage extends Component {

  userCity = this.props.context.user.city

  state = {
    breweries: null,
    selectedBrewery: null,
    userCity: this.userCity,
    longitude: null,
    latitude: null,
    showForm: false
  };

  componentDidMount() {


    apiHandler
      .getBreweries()
      .then((deRes) => {
        // console.log(deRes);
        this.setState({ breweries: deRes });
      })
      .catch((err) => console.log(err));

         // https://docs.mapbox.com/api/search/geocoding
    
    axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.userCity}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    )
    .then((response) => {
      const result = response.data.features[0];
      console.log(result);
      this.setState({
        longitude: result.geometry.coordinates[0],
        latitude: result.geometry.coordinates[1],
      })
    });
  }

  handleShowForm = () => {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    if (this.state.breweries === null) {
      return <div>fetching your brewery map</div>;
    }

    if (this.state.userCity === null) {
      return <div>fetching your brewery map</div>;
    }

    if (this.state.longitude === null) {
      return <div>fetching your brewery map</div>;
    }

    if (this.state.latitude === null) {
      return <div>fetching your brewery map</div>;
    }

    console.log(this.state);

    return (
      <div>
        <h4 onClick={this.handleShowForm}>Can't find your brewery? add it here</h4>
        {this.state.showForm &&
        <div className="map__brewery-form">
          <CreateBrewery />
        </div>}
        <div className="map__map-container">
          <MapComponent breweryList={this.state.breweries} longitude={this.state.longitude} latitude={this.state.latitude}  />
        </div>
      </div>
    );
  }
}

export default withUser(MapPage);
