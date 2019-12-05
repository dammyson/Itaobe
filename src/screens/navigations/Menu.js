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
import Order from '../checkout/Order';
import Address from '../checkout/Address';
import Payment from '../checkout/Payment';
import BankDetails from '../checkout/BankDetails';
import Confirmation from '../checkout/Confirmation';
import Pay from '../checkout/Pay';
import ForgotPassword from '../users/ForgotPassword';
import ChangePassword from '../users/ChangePassword';
import Packages from '../parkages/Packages';
import Registration from '../parkages/Registration';
import AddBankAccount from '../parkages/AddBankAccount';
import Contact from '../users/Contact';




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
            <Scene key="order" component={Order} modal hideNavBar />
            <Scene key="address" component={Address} modal hideNavBar />
             <Scene key="payment" component={Payment} modal hideNavBar />
             <Scene key="bank" component={BankDetails} modal hideNavBar />
             <Scene key="confirmation" component={Confirmation} modal hideNavBar />
             <Scene key="pay" component={Pay} modal hideNavBar />
             <Scene key="forgot" component={ForgotPassword} modal hideNavBar />
             <Scene key="changepassword" component={ChangePassword} modal hideNavBar />
             <Scene key="packages" component={Packages} modal hideNavBar />
             <Scene key="reg" component={Registration} modal hideNavBar />
             <Scene key="bank" component={AddBankAccount} modal hideNavBar />
             <Scene key="contact" component={Contact} modal hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }

}
