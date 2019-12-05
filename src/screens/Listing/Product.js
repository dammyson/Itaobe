/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, Text, Dimensions, TouchableWithoutFeedback, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { View, Container, Content, Button, Left, Right, Icon, Picker, Item, Grid, Col, Toast, Text as NBText } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from './../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      product: {},
      sellers: {},
      activeSlide: 0,
      quantity: 1,
      id: '',
      aut: '',
      user_id: '',
      session_id: '',
    };
  }

  componentWillMount() {
    this.setState({ id: this.props.id });
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ 'user_id': value.toString() })
    })
    AsyncStorage.getItem('session_id').then((value) => {
      this.setState({ 'session_id': value.toString() })
    })
    AsyncStorage.getItem('aut').then((value) => {
      this.setState({ 'aut': value.toString() })
    })
  }


  componentDidMount() {
    this.getProduct();
  }


  getProduct() {
    const { id } = this.state
    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('feature', "product");
    formData.append('action', "getid");
    formData.append('id', id);
    fetch('https://www.ita-obe.com/mobile/v1/product.php?action=getid&id=' + id + '&feature=product', {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res.data.sellers[0]);
        if (!res.error) {
          this.setState({
            loading: false,
            product: res.data,
            sellers: res.data.sellers[0],
            agent_id: res.data.sellers[0].agent_id,
            pro_name: res.data.name
          })

        } else {
          Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });
  }

  addToCart() {

    const { aut, quantity, product, user_id, id, sellers, session_id } = this.state
    if (aut == "" || aut == "no") {
      Alert.alert(
        'Login Out',
        'You are not logged in, log in to add this item to cart',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
          { text: 'OK', onPress: () => Actions.login() },
        ],
        { cancelable: false }
      )
      return
    }

    this.setState({ loading: true })

    const formData = new FormData();
    formData.append('feature', "cart");
    formData.append('action', "add");
    formData.append('prodid', id);
    formData.append('prodname', product.name);
    formData.append('agentid', sellers.agentID);
    formData.append('qty', quantity);
    formData.append('id', user_id);
    formData.append('sid', session_id);

    fetch('https://www.ita-obe.com/mobile/v1/cart.php', {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          this.setState({
            loading: false,
          })

          Alert.alert('Success', res.mesaage, [{ text: 'Okay' }])
        } else {
          Alert.alert('Adding to cart failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });

  }


  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text> Getting Product Details </Text>
        </View>
      );
    }
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' style={{ color: "#FFF" }} />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='ios-cart' style={{ color: "#FFF" }} />
        </Button>
      </Right>
    );
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} right={right} title={this.state.product.spec} />
        <Content>
          <Carousel
            data={this.state.product.images}
            renderItem={this._renderItem}
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            enableSnap={true}
          />
          <Pagination
            dotsLength={2}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{ backgroundColor: 'transparent', paddingTop: 0, paddingBottom: 0, marginTop: -15 }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View style={{ backgroundColor: '#fdfdfd', paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, alignItems: 'center' }}>
            <Grid>
              <Col size={3}>
                <Text style={{ fontSize: 18 }}>{this.state.product.name}</Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.sellers.currency} {this.state.sellers.rprice}</Text>
              </Col>
            </Grid>
            <Grid>
              <Col>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text>Quantity:</Text>
                </View>
              </Col>
              <Col size={3}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Button block icon transparent onPress={() => this.setState({ quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1 })} >
                    <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
                  </Button>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
                    <Text style={{ fontSize: 18 }}>{this.state.quantity}</Text>
                  </View>
                  <Button block icon transparent onPress={() => this.setState({ quantity: this.state.quantity + 1 })}>
                    <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-add' />
                  </Button>
                </View>
              </Col>
            </Grid>
            <Grid style={{ marginTop: 15 }}>
              <Col size={3}>
                <Button block onPress={this.addToCart.bind(this)} style={{ backgroundColor: Colors.bg_color }}>
                  <Text style={{ color: "#fdfdfd", marginLeft: 5 }}>Add to cart</Text>
                </Button>
              </Col>
              <Col>
                <Button block onPress={this.addToWishlist.bind(this)} icon transparent style={{ backgroundColor: '#fdfdfd' }}>
                  <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-heart' />
                </Button>
              </Col>
            </Grid>
            <View style={{ marginTop: 15, padding: 10, borderWidth: 1, borderRadius: 3, borderColor: 'rgba(149, 165, 166, 0.3)' }}>
              <Text style={{ marginBottom: 5 }}>Description</Text>
              <View style={{ width: 50, height: 1, backgroundColor: 'rgba(44, 62, 80, 0.5)', marginLeft: 7, marginBottom: 10 }} />
              <NBText note>
                {this.state.product.description}
              </NBText>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
  _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={index}
      >
        <Image
          source={{ uri: 'https://m.ofidy.com/ProductImages/' + item }}
          style={{ width: Dimensions.get('window').width, height: 350 }}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }



  openGallery = (pos) => {
    Actions.imageGallery({ images: this.state.product.images, position: pos });
  }



  addToWishlist() {
    const { aut, quantity, product, user_id, id, sellers, session_id } = this.state
    if (aut == "" || aut == "no") {
      Alert.alert(
        'Login Out',
        'You are not logged in, log in to add this item to cart',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
          { text: 'OK', onPress: () => Actions.login() },
        ],
        { cancelable: false }
      )
      return
    }

    this.setState({ loading: true })

    const formData = new FormData();
    formData.append('feature', "cart");
    formData.append('action', "add");
    formData.append('prodid', id);
    formData.append('prodname', product.name);
    formData.append('agentid', sellers.agentID);
    formData.append('id', user_id);

    fetch('https://www.ita-obe.com/mobile/v1/cart.php', {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          this.setState({
            loading: false,
          })
          Toast.show({
            text: 'Product added to your wishlist !',
            position: 'bottom',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 3000
          });
        } else {
          Toast.show({
            text: 'This product already exist in your wishlist !',
            position: 'bottom',
            type: 'danger',
            buttonText: 'Dismiss',
            duration: 3000
          });
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });

  }

  search(array, object) {
    for (var i = 0; i < array.length; i++)
      if (JSON.stringify(array[i]) === JSON.stringify(object))
        return true;
    return false;
  }

}

