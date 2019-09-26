/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import


handleBackPress = () => {
 
}


import Navbar from './navigations/Navbar';
import SideMenuDrawer from './navigations/SideMenuDrawer';
import CategoryBlock from './navigations/CategoryBlock';


export default class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      session_id: '',
    };
  }


  componentWillMount() {
    AsyncStorage.getItem('user_id').then((value) => {
        this.setState({ 'user_id': value.toString()})    
    })
    AsyncStorage.getItem('session_id').then((value) => {
      this.setState({ 'session_id': value.toString()})
      })
  }


  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name='ios-menu' style={{color: "#FFF"}} />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => Actions.wishlist()} transparent>
          <Icon name='ios-heart'  size={15} style={{color: "#FFF"}}/>
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='ios-cart'  size={15} style={{color: "#FFF"}}/>
        </Button>
      </Right>
    );
    return(
      <SideMenuDrawer styles={{marginTop:2}} ref={(ref) => this._sideMenuDrawer = ref}>
          <Container>
            <Navbar left={left} right={right} title="Home" />
            <Content>
              {this.renderCategories()}
            </Content>
          </Container>
      </SideMenuDrawer>
    );
  }

  renderCategories() {
    let cat = [];
    for(var i=0; i<categories.length; i++) {
      cat.push(
        <CategoryBlock key={categories[i].id} id={categories[i].id} image={categories[i].image} title={categories[i].title} />
      );
    }
    return cat;
  }

}

var categories = [
  {
    id: 2172,
    image: 'https://www.ita-obe.com/images/ofidy-banner-grocery-6.jpg',
    title: 'Tubers'
  },
  {
    id: 2176,
    image: 'https://www.ita-obe.com/images/ofidy-banner-grocery-8.jpg',
    title: 'Oil'
  },
  {
    id: 2179,
    image: 'https://www.ita-obe.com/images/ofidy-banner-grocery-7.jpg',
    title: 'Spice'
  },
  {
    id: 2178,
    image: 'https://www.ita-obe.com/images/ofidy-banner-grocery-5.jpg',
    title: 'Food Sharing'
  } ,
  {
    id: 2177,
    image: 'https://www.ita-obe.com/images/ofidy-banner-grocery-3.jpg',
    title: 'Vegetables'
  },
  {
    id: 2203,
    image: 'https://www.ita-obe.com/images/ofidy-banner-grocery-4.jpg',
    title: 'Fresh'
  },
  {
    id: 2175,
    image: 'https://www.ita-obe.com/images/ofidy-banner-grocery-1.jpg',
    title: 'Grains'
  }
  ,
  {
    id: 2170,
    image: 'https://www.ita-obe.com/images/ofidy-banner-grocery-2.jpg',
    title: 'Spice'
  }
];
