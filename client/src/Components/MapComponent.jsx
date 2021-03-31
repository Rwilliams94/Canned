
import React from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../Styles/MapPage.css'
import BreweryDetails from '../Components/Breweries/BreweryDetails';
import BrewSearchBar from '../Components/BrewSearchBar'
// import marker from '../assets/avatar.png'
const markerUrl = "https://res.cloudinary.com/dahzswwzk/image/upload/v1617034208/Basic_UI_Icon_Pack_-_Flat_map_pointer-512_d9c33w.webp"

const Map = ReactMapboxGl({
  accessToken:
    process.env.REACT_APP_MAPBOX_TOKEN
});


export class MapComponent extends React.PureComponent {


   state = {
     breweries: null,
     longitude: null,
     latitude: null,
     breweryClicked: null,
     showDetails: false,
     showName: false,
   }
  
   componentDidMount() {
     this.setState({
       breweries: this.props.breweryList,
       longitude: this.props.longitude,
       latitude: this.props.latitude,

     })
   }


  handleMarkerClick = (brewery) => {

    console.log(brewery);

    this.setState({
      longitude: brewery.longitude,
      latitude: brewery.latitude,
      breweryClicked: brewery,
      showName: true,
    })

  }

  handleShowDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
      showName: false,
    
    })
  }

  handleBrewerySelect = (brewery) => {
    console.log(brewery);
  this.setState({
    breweryClicked: brewery,
    longitude: brewery.longitude,
    latitude: brewery.latitude,
    showName: true,
  });
};
  
  
  render() {

    if(this.state.breweries === null) {
      return <div> loading map... </div>
    }
    if(this.state.longitude === null) {
      return <div> loading map... </div>
    }
    if(this.state.latitude === null) {
      return <div> loading map... </div>
    }
    
    console.log(this.state);

    return (
      
      <div className="flex-center">
       <div>
          <BrewSearchBar onSelect={this.handleBrewerySelect}/>
        </div>
        <Map
         // eslint-disable-next-line
          style={"mapbox://styles/mapbox/streets-v9"}
          containerStyle={{
            height: "80vh",
            width: "98vw",
          }}
          center={[this.state.longitude, this.state.latitude]}
        >
      
        {this.state.showName ? (
        <div onClick={this.handleShowDetails} className="flex-center map__showname-box">
          <h3>{this.state.breweryClicked.name}</h3>
        </div>) : ""
        }

        {this.state.showDetails ? (
          <div className="map__show-details-box">
            <BreweryDetails closePopUp={this.handleShowDetails} brewery={this.state.breweryClicked}/>        
        </div>
        ) : ""

        }
  
        {this.state.breweries.map(brewery=> (
  
            <Marker
              coordinates={[brewery.longitude, brewery.latitude]}
              anchor="bottom"
              key={brewery._id}
              onClick={() => this.handleMarkerClick(brewery)}
              >
                        
              <img className="map-marker" src={markerUrl} alt="marker" /> 
                            
            </Marker>
        ))}
        </Map>
        
      </div>
    )
  }
}

export default MapComponent;
