/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Alert } from 'react-native';
import { Container, Content, Text,View, Grid, Col, Left, Right, Button, Icon, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon  from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


// Our custom files and classes import
import Colors from '../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class Confirmation extends Component {
  constructor(props) {
      super(props);
      this.state = {
        payement:{},
        bill:'',
        loading: true,


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
        this.setState({ 'aut': value.toString()})
        this.registerPayment();
        })
        
        if(this.props.paymentDetails) {
          this.setState({payement: this.props.paymentDetails});
          console.warn(this.props.paymentDetails);
        }
  }


  registerPayment()
  {

   
  
      const {session_id, payement} = this.state

      this.setState({ loading: true})
      const formData = new FormData();
      formData.append('feature', "order");
      formData.append('action', "paymentInfo");
      formData.append('sid', session_id);

      formData.append('bill_addr',  payement.billadd.id);
      formData.append('ship_addr',  payement.shippadd.id);
      formData.append('shipmethod',  payement.shipmed.id);
      formData.append('shipreq',   payement.shipreq);
      formData.append('paymethod',  payement.paymethod);
      
    
      fetch('https://www.ita-obe.com/mobile/v1/order.php', { method: 'POST',  headers: {
        Accept: 'application/json',
      },body:formData,    
      })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if(!res.error){
        this.setState({ 
            loading: false,
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
          <Text>Processing</Text>
        </View>
      );
    }


    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => Actions.search()} transparent>
        </Button>
      </Right>
    );

  
    return(
      <Container>
        <Navbar left={left} right={right} title="Confirm" />
        <Content padder>
          <View>
            <Text style={{marginTop: 15, fontSize: 18, fontWeight: '700',}}> Your order has been completed you will get a call from one of our customer representative</Text>
            </View>
          <View style={{marginTop: 10, marginBottom: 10, paddingBottom: 7}}>
            <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.bg_color}} block iconLeft>
            <Icon name='ios-cash' /> 
             <Text style={{color: '#fdfdfd'}}>Proceed</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  checkout() {
    Actions.home();
  }


}
    
  
  