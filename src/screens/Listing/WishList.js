/**
* This is the Search file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from './../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class WishList extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      loading: false,
      aut: '',
      user_id: '',
      session_id: '',
    };
}

componentWillMount() 
{
    this.setState({id: this.props.id });
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ 'user_id': value.toString()})    
    })
    AsyncStorage.getItem('session_id').then((value) => {
    this.setState({ 'session_id': value.toString()})
    })
    AsyncStorage.getItem('aut').then((value) => {
      if(value.toString() == 'no' ){
        Alert.alert(
          'Login Out',
          'You are not logged in, log in to add this item to cart',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: () => Actions.login()},
          ],
          { cancelable: false }
        )
        return
      }
      this.setState({ 'aut': value.toString()})
      this.getCart();
      })
      
}

componentDidMount() {
 
}

getList()
  {
      const {user_id,session_id} = this.state
      console.warn(user_id,session_id);
      this.setState({ loading: true})
      const formData = new FormData();
      formData.append('feature', "cart");
      formData.append('action', "get");
      formData.append('id', user_id);
      fetch('https://www.ita-obe.com/mobile/v1/cart.php', { method: 'POST',  headers: {
        Accept: 'application/json',
      },body:formData,    
      })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if(!res.error){
        this.setState({ 
            loading: false,
            cartItems:res.data
          })

        }else{
      Alert.alert('Registration failed', res.message, [{text: 'Okay'}])
      this.setState({ loading: false})
        }
      }).catch((error)=>{
        console.warn(error);
        alert(error.message);
     });
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
          <Navbar left={left} title="MY WISHLIST" />
          {this.state.items.length <=0 ?
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="heart" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}} />
              <Text style={{color: '#95a5a6'}}>Your wishlist is empty...</Text>
            </View>
            :
            <Content padder>
                  {this.renderItems()}
            </Content>
          }
      </Container>
    );
  }

  renderItems() {
    let items = [];
    this.state.items.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.items.length === i+1}
          onPress={() => this.itemClicked(item)}
        >
          <Thumbnail square style={{width: 110, height: 90}} source={{ uri: item.image }} />
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontSize: 18}}>
              {item.title}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>{item.price}</Text>
            <Text style={{fontSize: 14 ,fontStyle: 'italic'}}>{item.category}</Text>
          </Body>
          <Right>
            <Button style={{marginLeft: -25}} transparent onPress={() => this.removeItemPressed(item)}>
              <Icon size={30} style={{fontSize: 30, color: '#95a5a6'}} name='ios-remove-circle-outline' />
            </Button>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  itemClicked(item) {
    Actions.product({product: item});
  }

  removeItemPressed(item) {
    Alert.alert(
      'Remove '+item.title,
      'Are you sure you want this item from your wishlist ?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeItem(item)},
      ]
    )
  }

  removeItem(itemToRemove) {
    let items = [];
    this.state.items.map((item) => {
      if(JSON.stringify(item) !== JSON.stringify(itemToRemove) )
        items.push(item);
    });
    this.setState({items: items});
    AsyncStorage.setItem("WISHLIST",JSON.stringify(items));
  }


}
