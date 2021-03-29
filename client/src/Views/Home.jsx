import React from 'react';
// import { Link } from 'react-router-dom';
import allBeer from '../assets/beers.png'



const Home = () => {
    return (
        <div>
            
      <div className="home__box">
  
        <img className="home__image" src={allBeer} alt="beer" />
        <h1>Welcome to the beers site</h1>
        <p className="home__para">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste quidem
        sed voluptates animi natus autem deleniti fugiat repellendus illum
        consequuntur aliquam, magnam eaque itaque aut amet, libero aspernatur
        aperiam officiis.
        </p>
  
        
      </div>
 
        </div>
    )
}

export default Home
