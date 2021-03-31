import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserContext from './Components/Auth/UserContext';
// import axios from 'axios';
import NavMain from './Components/NavMain'
import SignInPage from './Views/SignIn';
import SignUpPage from './Views/SignUp';
import Beers from './Views/Beers';
// import NewBeer from './Views/NewBeer';
// import UpdateBeer from './Views/UpdateBeer';
import Lost from './Views/Lost'
import BeerDetails from './Views/BeerDetails';
import UserBeers from './Views/UserBeers';
// import api from './API/apiHandler';
import Home from './Views/Home'
import MapPage from './Views/MapPage';
import Profile from './Views/Profile';

import './App.css';




export class App extends Component {
  static contextType = UserContext
 
  state = {
    user: null, 
    isLoggedIn: false,
    loading: true,
  }

  componentDidMount() {
    
  }
  

  render() {

    // if (!this.context.isLoggedIn) {
    //   return <div>loading user...</div>
    // }

    

    return (


      <div className="App">
        
      
        <div className="app__main-block overflow">

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/beer" component={Beers} />
          <Route exact path="/user-beer" component={UserBeers} />
          <Route exact path="/beer-detail/:id" component={BeerDetails} />
          {/* <Route exact path="/beer-add" component={NewBeer} /> */}
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/profile" component={Profile} />

          {/* 
          <Route exact path="/beers/:id" component={BeerDetails} />
          <Route exact path="/beers/edit/:id" component={UpdateBeer} /> */}
          <Route exact path="*" component={Lost} />
        </Switch>
        
        </div>
      

        <NavMain />
        
      </div>
    );
  }
}

export default App
