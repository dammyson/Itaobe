/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, View, Text, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from './../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class Cart extends Component {

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

  getCart()
    {
        const {user_id,session_id} = this.state
        console.warn(user_id,session_id);
        this.setState({ loading: true})
        const formData = new FormData();
        formData.append('feature', "cart");
        formData.append('action', "get");
        formData.append('id', user_id);
        formData.append('sid', session_id);
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
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text> Getting Products </Text>
        </View>
      );
    }
    var left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="ios-close" size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
          <Navbar left={left} title="MY CART" />
          {this.state.cartItems.length <=0 ?
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="ios-cart" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}} />
              <Text style={{color: '#95a5a6'}}>Your cart is empty</Text>
            </View>
            :
            <Content style={{paddingRight: 10}}>
              <List>
                  {this.renderItems()}
              </List>
              <Grid style={{marginTop: 20, marginBottom: 10}}>
                <Col style={{paddingLeft: 10,paddingRight: 5}}>
                  <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.bg_color}} block iconLeft>
                    <Icon name='ios-card' />
                    <Text style={{color: '#fdfdfd'}}>Checkout</Text>
                  </Button>
                </Col>
                <Col style={{paddingLeft: 5, paddingRight: 10}}>
                  <Button onPress={() => this.removeAllPressed()} style={{borderWidth: 1, borderColor: Colors.bg_color}} block iconRight transparent>
                    <Text style={{color: Colors.navbarBackgroundColor}}>Emtpy Cart</Text>
                    <Icon style={{color: Colors.navbarBackgroundColor}} name='ios-trash' />
                  </Button>
                </Col>
              </Grid>
            </Content>
          }
      </Container>
    );
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.cartItems.length === i+1}
          onPress={() => this.itemClicked(item)}
        >
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontSize: 18}}>
              {item.quantity > 1 ? item.quantity+"x " : null}
              {item.title}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>{item.name}</Text>
            <Text style={{fontSize: 14 ,fontStyle: 'italic'}}>price: {item.currency} {item.unitPrice}</Text>
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

  removeItemPressed(item) {
    Alert.alert(
      'Remove '+item.title,
      'Are you sure you want this item from your cart ?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeItem(item)},
      ]
    )
  }

  removeItem(itemToRemove) {
   console.warn(itemToRemove)
   const {user_id,session_id} = this.state
        
   this.setState({ loading: true})
   const formData = new FormData();
   formData.append('feature', "cart");
   formData.append('action', "delete");
   formData.append('id', user_id);
   formData.append('sid', session_id);
   formData.append('tid', itemToRemove.id);
   fetch('https://www.ita-obe.com/mobile/v1/cart.php', { method: 'POST',  headers: {
     Accept: 'application/json',
   },body:formData,    
   })
   .then(res => res.json())
   .then(res => {
     if(!res.error){
     this.setState({ 
         loading: false,
       })
       this.getCart();

     }else{
   Alert.alert('Registration failed', res.message, [{text: 'Okay'}])
   this.setState({ loading: false})
     }
   }).catch((error)=>{
     console.warn(error);
     alert(error.message);
  });









  }

  removeAllPressed() {
    Alert.alert(
      'Empty cart',
      'Are you sure you want to empty your cart ?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeAll()}
      ]
    )
  }

  removeAll() {
        this.setState({cartItems: []})
       const {user_id,session_id} = this.state
        
        this.setState({ loading: true})
        const formData = new FormData();
        formData.append('feature', "cart");
        formData.append('action', "empty");
        formData.append('id', user_id);
        formData.append('sid', session_id);
        fetch('https://www.ita-obe.com/mobile/v1/cart.php', { method: 'POST',  headers: {
          Accept: 'application/json',
        },body:formData,    
        })
        .then(res => res.json())
        .then(res => {
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

 

  checkout() {
    Actions.order({cartItems: this.state.cartItems});
  }

  itemClicked(item) {
    Actions.product({product: item});
  }

}

const styles={
  title: {
    fontWeight: '100'
  }
};

const items = [
  {id: 1, quantity:1, title: 'Black Hat', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 2, quantity:3, title: 'V Neck T-Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
  {id: 10, quantity:1, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
];
