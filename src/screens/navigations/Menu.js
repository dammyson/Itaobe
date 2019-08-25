/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';




import Splash from '../splash/Splash';
import SignIn from '../users/SignIn';
import SignUp from '../users/SignUP';
import Home from './../Home';
import MainView from './../MainView';
import ListGrid from '../Listing/ListGrid';
import ListSwiper from '../Listing/ListSwiper';
import Product from '../Listing/Product';
import Cart from '../Listing/Cart';
import WishList from '../Listing/WishList';


export default class Main extends Component {
  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="splash" component={Splash} hideNavBar />
            <Scene key="main" component={MainView} hideNavBar />
            <Scene key="home" component={Home} hideNavBar />
            <Scene key="login" component={SignIn} hideNavBar />
            <Scene key="signup" component={SignUp} hideNavBar />
            <Scene key="swipe" component={ListSwiper} hideNavBar />
            <Scene key="grid" component={ListGrid} hideNavBar />
            <Scene key="product" component={Product} hideNavBar />
            <Scene key="cart" component={Cart} modal hideNavBar />
            <Scene key="wishlist" component={WishList} modal hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }

}
