// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from './../../resources/styles/colors';
import Navbar from '../navigations/Navbar';
import PackageBlock from '../navigations/PackageBlock';

export default class Packages extends Component {
  constructor(props) {
      super(props);
      this.state = {
        items: []
      };
  }


  componentWillMount() {
   
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="ios-close" size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
          <Navbar left={left} title="Ita Obe Packages" />
            <Content>
                  {this.renderCategories()}
            </Content>
      </Container>
    );
  }



  itemClicked(item) {
    Actions.product();
  }

  renderCategories() {
    let cat = [];
    for(var i=0; i<categories.length; i++) {
      cat.push(
        <PackageBlock key={categories[i].id} id={categories[i].id} image={categories[i].image} title={categories[i].title} description={categories[i].description} />
      );
    }
    return cat;
  }


}
var categories = [
    {
      id: 1,
      title: 'Cooperative Family Feeding(CFF)',
      image: 'https://www.ita-obe.com/images/direct-customer.png',
      description: 'The cooperative movement began in Europe in the 19th century, primarily in Britain and France as a self-help initiative by workers. Our cooperative family feeding product caters to the consumer goods needs of cooperators leveraging the collective strength of the cooperative movement to guarantee credit for food products'
    },
    {
      id: 2,
      title: 'Payday 2 Payday (P2P)',
      image: 'https://www.ita-obe.com/images/pickup-truck.png',
      description: 'We work everyday, but we don\'t get paid everyday. Workers deserve to be able to eat everyday without worrying about how far off payday is. Our payday to payday product allows you meet your food needs at all times in a convenient and affordable manner'
    },
    {
      id: 3,
      title: 'Bulktrade',
      image: 'https://www.ita-obe.com/images/advertising.png',
      description:'Hospitals, hotels, schools, event planners and social occasions such birthdays, weddings, burials etc require us to roll out the drums. Because resources will always be limited, Ita Obe offers payment plans for food requirements subject to terms'
    }
    ,{
        id: 4,
        title: 'Diaspora Food Delivery (DFD)',
        image: 'https://www.ita-obe.com/images/advertising.png',
        description:'The ability to support our under-aged and aged dependents is one of the key considerations for most diaspora settlements. At Ita Obe we ensure that your remittances from wherever you are serve the purpose that it is meant for when it comes to food. Shop from wherever you are and we will ensure your dependents receive their grocery in record time'
      }
  ];