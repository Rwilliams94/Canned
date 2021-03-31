import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "../Styles/MapPage.css";


// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// import marker from '../assets/avatar.png'
const markerUrl =
  "https://res.cloudinary.com/dahzswwzk/image/upload/v1617034208/Basic_UI_Icon_Pack_-_Flat_map_pointer-512_d9c33w.webp";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export class MapComponent extends React.PureComponent {
  state = {
    breweries: null,
    longitude: null,
    latitude: null,
    breweryClicked: null,
    showDetails: false,
    showName: false,
  };

  componentDidMount() {
    this.setState({
      breweries: this.props.breweryList,
      longitude: this.props.longitude,
      latitude: this.props.latitude,
    });
  }

  componentDidUpdate() {
    this.setState({
      longitude: this.props.longitude,
      latitude: this.props.latitude,
    });
  }

  



  render() {
    if (this.state.breweries === null) {
      return <div> loading map... </div>;
    }
    if (this.state.longitude === null) {
      return <div> loading map... </div>;
    }
    if (this.state.latitude === null) {
      return <div> loading map... </div>;
    }


    return (
      <div className="map__main">
          <Map
            // eslint-disable-next-line
            style={"mapbox://styles/mapbox/streets-v10"}
            zoom={[11]}
            containerStyle={{
              top: "8.2vh",
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
            }}
            center={[this.state.longitude, this.state.latitude]}
          >
          
          {this.state.breweries.map((brewery) => (
              <Marker
                coordinates={[brewery.longitude, brewery.latitude]}
                anchor="bottom"
                key={brewery._id}
                onClick={() => this.props.markerClick(brewery)}
              >
                <img className="map-marker" src={markerUrl} alt="marker" />
              </Marker>
            ))}
          </Map>

     
      </div>
    );
  }
}

export default MapComponent;
