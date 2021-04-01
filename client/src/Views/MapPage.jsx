import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import apiHandler from "../API/apiHandler";
import withUser from '../Components/Auth/withUser'
import CreateBrewery from '../Components/Breweries/CreateBrewery'
import axios from 'axios'
import BrewSearchBar from "../Components/BrewSearchBar";
import BreweryDetails from "../Components/Breweries/BreweryDetails";
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
    showForm: false,
    showDetails: false,
    showName: false,
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

  handleShowDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
      showName: false,
    });
  };


  handleBrewerySelect = (brewery) => {
    this.setState({
      breweryClicked: brewery,
      longitude: brewery.longitude,
      latitude: brewery.latitude,
      showName: true,
    });
  };

  handleMarkerClick = (brewery) => {
    console.log(brewery);

    this.setState({
      longitude: brewery.longitude,
      latitude: brewery.latitude,
      breweryClicked: brewery,
      showName: true,
    });
  };


  handleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm,
      showName: false
    })
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
        
        {this.state.showForm &&
        <div className="map__brewery-form">
          <CreateBrewery />
        </div>}
        {this.state.showName && (
        <div
          onClick={this.handleShowDetails}
          className="flex-center map__showname-box"
        >
          <h3>{this.state.breweryClicked.name}</h3>
        </div>
        )}
        {this.state.showDetails && (
          <div className="map__show-details-box">
            <BreweryDetails
              closePopUp={this.handleShowDetails}
              brewery={this.state.breweryClicked}
            />
          </div>
        )}

        <div className="map__search-box">
          <BrewSearchBar onSelect={this.handleBrewerySelect} />
          <h4 className="showform" onClick={this.handleShowForm}>Can't find your brewery? Add it here</h4>
        </div>
        <div className="map__map-container">
          <MapComponent markerClick={this.handleMarkerClick} breweryList={this.state.breweries} longitude={this.state.longitude} latitude={this.state.latitude}  />
        </div>
      </div>
    );
  }
}

export default withUser(MapPage);
