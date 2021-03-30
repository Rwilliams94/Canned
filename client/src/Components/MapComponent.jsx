import React from "react";
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../Styles/MapPage.css'
// import marker from '../assets/avatar.png'
const markerUrl = "https://res.cloudinary.com/dahzswwzk/image/upload/v1617034208/Basic_UI_Icon_Pack_-_Flat_map_pointer-512_d9c33w.webp"

const MapComponent = (props) => {

  const breweries = props.breweryList;
  let longitude = props.longitude
  let latitude = props.latitude


  const handleClick = (event) => {

    props.toggle()
    const itemId = event.currentTarget.value
    props.display(itemId)

  }

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1Ijoicm10d2lsbGlhbXMiLCJhIjoiY2ttbThvcXNwMGRyazJ3bGVwdG9sbnRzcSJ9.0R-H-K5vBBYCOD9m6cCxXw'
  });
  

  return (
    <div>
      <Map
       // eslint-disable-next-line
        style={"mapbox://styles/mapbox/streets-v9"}
        containerStyle={{
          height: "80vh",
          width: "98vw",
        }}
        center={[longitude, latitude]}
      >
        {/* <Marker
        coordinates={[testBrewery.longitude, testBrewery.latitude]}
        anchor="bottom"
        >
        <img className="map-marker" src={markerUrl} alt="marker" />
               

        </Marker> */}

        {/*  <button className="button_clear" value={brewery._id} onClick={handleClick}> 
        <img className={`map-marker ${props.markerShow ? "" : "hidden"}`} src={markerUrl} alt="marker" /> */}

      {breweries.map(brewery=> (

          <Marker
            coordinates={[brewery.longitude, brewery.latitude]}
            anchor="bottom"
            key={brewery._id}
            onClick={() => this.handleMarkerClick(brewery.longitude, brewery.latitude)}
            >
                         
            <img className="map-marker" src={markerUrl} alt="marker" />
            
             
          </Marker>
      ))}
      </Map>
      
    </div>
  );
};

export default MapComponent;
