import React, { Component } from "react";
import MapComponent from "../Components/MapComponent";
import apiHandler from "../API/apiHandler";
// import BrewSearchBar from "../Components/BrewSearchBar";
import "../Styles/MapPage.css";



export class MapPage extends Component {
  state = {
    breweries: null,
    selectedBrewery: null,
    longitude: -0.1278,
    latitude: 51.5074
  };

  componentDidMount() {
    apiHandler
      .getBreweries()
      .then((deRes) => {
        // console.log(deRes);
        this.setState({ breweries: deRes });
      })
      .catch((err) => console.log(err));
  }



  render() {
    if (this.state.breweries === null) {
      return <div>fetching your brewery map</div>;
    }



    return (
      <div>
        <div className="map__map-container">
          <MapComponent breweryList={this.state.breweries} longitude={this.state.longitude} latitude={this.state.latitude}  />
        </div>
      </div>
    );
  }
}

export default MapPage;
