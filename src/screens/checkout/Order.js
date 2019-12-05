/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Icon, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { RadioButton } from 'react-native-paper';

// Our custom files and classes import
import Colors from '../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      aut: '',
      user_id: '',
      session_id: '',

      product: [],
      selectedSize: '',
      delto: true,
      billadd: '',
      shippadd: '',
      shipmed: '',
      shippingmethod: [],
      paymethod: 'bank',
      toadd: 'yes',
      shipreq: "null"
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
      this.getAddress();
    })


  }

  componentDidMount() {

  }

  getAddress() {
    const { user_id, session_id } = this.state
    this.setState({ loading: true })

    const formData = new FormData();
    formData.append('feature', "user");
    formData.append('action', "getAddress");

    fetch('https://www.ita-obe.com/mobile/v1/user.php?id=' + user_id, {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          this.setState({
            loading: false,
            product: res.data
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

  getshipping(address) {
    this.setState({ billadd: address })
    const { user_id, session_id } = this.state
    this.setState({ loading: true, })
    const formData = new FormData();
    formData.append('feature', "order");
    formData.append('action', "getCost");
    formData.append('sid', session_id);
    formData.append('dest', address.id);

    fetch('https://www.ita-obe.com/mobile/v1/order.php', {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if (!res.error) {
          this.setState({
            loading: false,
            shippingmethod: [
              { id: 20, price: res.data[0], name: 'Fast Shipping ' + res.data[0] + ' ' + res.data[5] }
            ]
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

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text>Processing</Text>
        </View>
      );
    }


    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.search()} transparent>
        </Button>
      </Right>
    );


    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} right={right} title="CHECKOUT" />
        <Content padder>
          <View>
            <Text style={{ marginTop: 15, fontSize: 18 }}>BILLING ADDRESS</Text>
            <Item regular style={{ marginTop: 7 }}>
              <Picker
                mode="dropdown"
                placeholder="Select a billing address"
                note={true}
                selectedValue={this.state.shippadd}
                onValueChange={(size) => this.setState({ shippadd: size })}
              >
                <Picker.Item label="Select a Billing address" value="key0" />
                {this.renderAddress()}
              </Picker>

              <TouchableOpacity onPress={() => Actions.address()}>
                <Icon name='ios-add' />
              </TouchableOpacity>
            </Item>


            <Text style={{ marginTop: 15, fontSize: 18 }}>SELECT DELIVERY OPTIONS</Text>

            <RadioButton.Group
              onValueChange={value => this.setState({ toadd: value })}
              value={this.state.toadd}
            >
              <View style={{ justifyContent: 'center' }}>

                <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                  <Text style={{ fontSize: 15, marginLeft: 7, }}>Deliver to my address</Text>
                  <Text style={{ fontSize: 15, marginLeft: 7, }}>Yes</Text>
                  <View
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      backgroundColor: '#ffe6e6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}
                  >
                    <RadioButton value="yes" />
                  </View>
                  <Text style={{ fontSize: 15 }}>No</Text>
                  <View
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      backgroundColor: '#ffe6e6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}
                  >
                    <RadioButton value="no" />
                  </View>
                </Item>

              </View>


            </RadioButton.Group>





            <Text style={{ marginTop: 15, fontSize: 18 }}>SHIPPING INFORMATION</Text>
            <Item regular style={{ marginTop: 7 }}>
              <Picker
                mode="dropdown"
                placeholder="Select a shipping address"
                note={true}
                selectedValue={this.state.billadd}
                onValueChange={(size) => this.getshipping(size)}
              >
                <Picker.Item label="Select a shipping address" value="key0" />
                {this.renderAddress()}
              </Picker>
              <TouchableOpacity onPress={() => Actions.address()}>
                <Icon name='ios-add' />
              </TouchableOpacity>
            </Item>




            <Text style={{ marginTop: 15, fontSize: 18 }}>SHIPPING METHOD</Text>
            <Item regular style={{ marginTop: 7 }}>
              <Picker
                mode="dropdown"
                placeholder="Select Shipping method"
                note={true}
                selectedValue={this.state.shipmed}
                onValueChange={(size) => this.setState({ shipmed: size })}
              >
                <Picker.Item label="Select a shipping Method" value="key0" />
                {this.renderShipping()}
              </Picker>
            </Item>


            <Text style={{ marginTop: 15, fontSize: 18 }}>Any comments/notes</Text>
            <Item regular style={{ marginTop: 7 }}>
              <Input placeholder='Any comments/notes for shipping & delivery:' onChangeText={(text) => this.setState({ shipreq: text })} placeholderTextColor="#687373" />
            </Item>

            <Text style={{ marginTop: 15, fontSize: 18 }}>PAYMENT METHOD</Text>
            <RadioButton.Group
              onValueChange={value => this.setState({ paymethod: value })}
              value={this.state.paymethod}
            >
              <View style={{ justifyContent: 'center' }}>

                <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                  <View
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      backgroundColor: '#ffe6e6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}
                  >
                    <RadioButton value="bank" />
                  </View>
                  <Text style={{ fontSize: 15 }}>Bank Transfer</Text>
                  <Icon name='ios-cash' />
                </Item>

              </View>

              <View style={{ justifyContent: 'center' }}>

                <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                  <View
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      backgroundColor: '#ffe6e6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}
                  >
                    <RadioButton value="delivery" />
                  </View>
                  <Text style={{ fontSize: 15 }}>Pay on Delivery</Text>
                  <Icon name='ios-person' />
                </Item>

              </View>


              <View style={{ justifyContent: 'center' }}>

                <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                  <View
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      backgroundColor: '#ffe6e6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}
                  >
                    <RadioButton value="rave" />
                  </View>

                  <Text style={{ fontSize: 15 }}>Card (Rave) - Naira</Text>
                  <Icon name='ios-card' />
                </Item>
              </View>

              <View style={{ justifyContent: 'center' }}>

                <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                  <View
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      backgroundColor: '#ffe6e6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}
                  >
                    <RadioButton value="interswitch" disabled />
                  </View>
                  <Text style={{ fontSize: 15 }}>Card (Interswitch) - Naira</Text>
                  <Icon name='ios-card' />
                </Item>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <Item regular style={{ marginTop: 7, paddingTop: 15, paddingBottom: 15, }}>
                  <View
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      backgroundColor: '#ffe6e6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}
                  >
                    <RadioButton value="gift" disabled />
                  </View>
                  <Text style={{ fontSize: 15 }}>Card (Gift Card) - Naira</Text>
                  <Icon name='ios-card' />
                </Item>


              </View>


            </RadioButton.Group>


          </View>
          <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
            <Button onPress={() => this.checkout()} style={{ backgroundColor: Colors.bg_color }} block iconLeft>
              <Text style={{ color: '#fdfdfd' }}>Proceed</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          style={{ marginLeft: 0 }}
        >
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>
              {item.quantity > 1 ? item.quantity + "x " : null}
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, fontStyle: 'italic' }}>Color: {item.color}</Text>
            <Text style={{ fontSize: 14, fontStyle: 'italic' }}>Size: {item.size}</Text>
          </Body>
          <Right>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{item.price}</Text>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  checkout() {
    const { paymethod, toadd, shipreq, billadd, shippadd, shipmed } = this.state
    const shippingmethod =
      { paymethod: paymethod, toadd: toadd, shipreq: shipreq, billadd: billadd, shippadd: shippadd, shipmed: shipmed }
    Actions.payment({ paymentDetails: shippingmethod });

  }


  renderAddress() {
    let serviceItems = this.state.product.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s.addressLine1} />
    });
    return serviceItems;
  }

  renderShipping() {
    let serviceItems = this.state.shippingmethod.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s.name} />
    });
    return serviceItems;
  }


}
