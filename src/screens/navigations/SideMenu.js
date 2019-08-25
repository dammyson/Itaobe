/**
* This is the SideMenu component used in the navbar
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager,TouchableOpacity, Linking } from 'react-native';
import { View, List,Text,ListItem, Body, Left, Right, Icon, Item, Input, Button, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import SideMenuSecondLevel from './SideMenuSecondLevel';
import category from './../../data/category'

export default class SideMenu extends Component {
  constructor(props) {
      super(props);
      this.state = {
        search: "",
        searchError: false,
        subMenu: false,
        subMenuItems: [],
        clickedItem: ''
      };

      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  render() {
    return(
          <ScrollView style={styles.container}>
              {this.renderMenu()}
          </ScrollView>
    );
  }

  renderMenu() {
    if(!this.state.subMenu) {
      return(
        <View>
          <View style={{paddingLeft: 15,paddingTop: 25, paddingRight: 15}}>
            <Item error={this.state.searchError}>
                <Input
                  placeholder='Search...'
                  onChangeText={(text) => this.setState({search: text, searchError: false})}
                  onSubmitEditing={() => this.search()}
                />
                <Icon active name='ios-search' onPress={() => this.search()} />
            </Item>
          </View>
          <View style={{paddingRight: 15}}>
            <List>
              <ListItem
                icon
                key={0}
                button={true}
                onPress={() => Actions.home()}
              >
                <Body>
                  <Text>Home</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              {this.renderMenuItems()}
            </List>
          </View>
          <View style={styles.line} />
          <View style={{paddingRight: 15}}>
            <List>
              {this.renderSecondaryList()}
            </List>
          </View>
          <View style={styles.line} />
          <View style={{paddingRight: 15, paddingLeft: 15}}>
            <Text style={{marginBottom: 7}}>Follow us</Text>
            <Grid>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-facebook' onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-instagram' onPress={() => Linking.openURL('http://www.instagram.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-twitter' onPress={() => Linking.openURL('http://www.twitter.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-youtube' onPress={() => Linking.openURL('http://www.youtube.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-snapchat' onPress={() => Linking.openURL('http://www.snapchat.com/').catch(err => console.error('An error occurred', err))} /></Col>
            </Grid>
          </View>
        </View>
      );
    }
    else {
      return(
        <SideMenuSecondLevel back={this.back.bind(this)} title={this.state.clickedItem} menu={this.state.subMenuItems} />
      );
    }
  }

  renderMenuItems() {
    let items = [];
    category.map((item, i) => {
      items.push(
        <ListItem
          last={menuItems.length === i+1}
          icon
          key={item.id}
          button={true}
        >
          <Body>
          <TouchableOpacity  onPress={() => this.itemClicked(item)}>
            <Text>{item.title}</Text>
            </TouchableOpacity>
          </Body>
          <Right>
          <TouchableOpacity  onPress={() => this.itemmoreClicked(item)}>
            <Icon name="arrow-forward" 
            
            />
            </TouchableOpacity>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  itemClicked(item) {
    Actions.grid({ title: item.title, cat: item.id, ctg: 0,});
      return;
    
  }

  itemmoreClicked(item) {
    if(!item.subMenu || item.subMenu.length<=0) {
      return;
    }
    var animationConfig = {
        duration: 150,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({subMenu: true, subMenuItems: item.subMenu, clickedItem: item.title});
  }

  back() {
    var animationConfig = {
        duration: 150,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({subMenu: false, subMenuItems: [], clickedItem: ''})
  }

  search(text) {
    if(this.state.search.length <= 2)
      this.setState({searchError: true, search: ""});
    else
      Actions.SignIn({searchText: this.state.search});
  }

  renderSecondaryList() {
    let secondaryItems = [];
    menusSecondaryItems.map((item, i) => {
      secondaryItems.push(
        <ListItem
          last
          icon
          key={item.id}
          button={true}
          onPress={Actions[item.key]}
        >
          <Left>
            <Icon style={{fontSize: 18}} name={item.icon} />
          </Left>
          <Body style={{marginLeft: -15}}>
            <Text style={{fontSize: 16}}>{item.title}</Text>
          </Body>
        </ListItem>
      );
    });
    return secondaryItems;
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  }
};

var menuItems = category

const menusSecondaryItems = [
  {
    id: 19,
    title: 'Wish List',
    icon: 'heart',
    key: 'wishlist'
  },
  {
    id: 20,
    key: 'map',
    title: 'Store Finder',
    icon: 'ios-pin',
    key: 'map'
  },
  {
    id: 21,
    key: 'contact',
    title: 'Contact Us',
    icon: 'md-phone-portrait',
    key: 'contact'
  },
  {
    id: 23,
    key: 'newsletter',
    title: 'Newsletter',
    icon: 'md-paper',
    key: 'newsletter'
  }
];
