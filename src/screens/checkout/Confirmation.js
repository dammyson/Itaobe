/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage,Image,ImageBackground, StyleSheet, Dimensions, Alert } from 'react-native';
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
       // loading: true,


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
      //  this.registerPayment();
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
        <ImageBackground
      source={require('../../assets/imgfour.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
      >

      <View style={styles.slide1}>
      
         <View style={styles.slidemid}>
        
         <Text style={{ marginLeft:20, fontSize: 18, marginRight:30, marginBottom:30, textAlign: 'center',fontWeight: '500',}}> 
         Your order has been completed you will get a call from one of our customer representative </Text>
                
                   <Image 
                style={styles.logoch}
                resizeMode='contain'
                source = {require('../../assets/checked.png')}
               />
               <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.bg_color, marginLeft:20, marginRight:30, marginTop:40, }} block iconLeft>
            <Icon name='ios-cash' /> 
             <Text style={{color: '#fdfdfd'}}>Proceed</Text>
            </Button>
         </View>
      </View>
      </ImageBackground>
        </Content>
      </Container>
    );
  }

  checkout() {
    Actions.home();
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  logo:{
    width:160,
    height:80,
    alignItems: 'center',
    justifyContent: 'center',
    
    
},
logoch:{
    width:150,
    height:150,
    alignItems: 'center',
    justifyContent: 'center',
    
    
},

buttonContainer:{
    height:50,
    backgroundColor: "#16cd95",
    borderRadius: 30,
    alignItems: 'center',
    width: 300,
    marginLeft:20,
    marginRight:20,
    justifyContent: 'center',
   
  },
  buttonText:{
        textAlign:'center',
        color: "#fff",
        fontWeight: '700',
        fontSize: 18,
  }
,
slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidemid: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
    
  
  