/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ImageBackground, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Text,View, Grid, Col, Left, Right, Button, Icon, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon  from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


// Our custom files and classes import
import Colors from '../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class Payement extends Component {
  constructor(props) {
      super(props);
      this.state = {
        payement:{},
        bill:''


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
        this.getBill();
        })
        
        if(this.props.paymentDetails) {
          this.setState({payement: this.props.paymentDetails});
          console.warn(this.props.paymentDetails);
        }
  }


  getBill()
    {
        const {user_id,session_id, payement} = this.state
        console.warn(user_id,session_id);
        this.setState({ loading: true})
        const formData = new FormData();
        formData.append('feature', "order");
        formData.append('action', "getBill");
        formData.append('sid', session_id);
        fetch('https://www.ita-obe.com/mobile/v1/order.php', { method: 'POST',  headers: {
          Accept: 'application/json',
        },body:formData,    
        })
        .then(res => res.json())
        .then(res => {
          var array = res.data.split("."); 
          var array2 = payement.shipmed.price.split("."); 
          console.warn(array[0]);
          if(!res.error){
            var total = parseInt(array[0]) + parseInt(array2[0])
          this.setState({ 
              loading: false,
              bill:total
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
    const {payement, bill} = this.state

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
        <ImageBackground
        source={require('../../assets/imgfour.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
        >
      <Container>
        <Navbar left={left} right={right} title="Confirm" />
        <Content padder>
          <View>
            <Text style={{marginTop: 15, fontSize: 18, fontWeight: '700',}}>Order Details</Text>

             <Text style={{marginTop: 15, fontSize: 18,}}>Billing Address:</Text>
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>              
            <Text style={{fontSize: 15, marginLeft: 7 }}>{payement.billadd.addressLine1}</Text>               
            </Item>
            
            <Text style={{marginTop: 15, fontSize: 18,}}>Shipping Address: </Text>
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>            
            <Text style={{fontSize: 15, marginLeft: 7 }}>{payement.billadd.addressLine1}</Text>               
            </Item>

             <Text style={{marginTop: 15, fontSize: 18,}}>Shipping Method: </Text>
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>           
            <Text style={{fontSize: 15, marginLeft: 7 }}> {payement.shipmed.name}</Text>               
            </Item>

            <Text style={{marginTop: 15, fontSize: 18,}}>Payement Method: </Text>
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15}}>            
            <Text style={{fontSize: 15, marginLeft: 7 }}> {payement.paymethod}</Text>               
            </Item>


             <Text style={{marginTop: 15, fontSize: 18,}}>Total: </Text>
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15}}>            
            <Text style={{fontSize: 15, marginLeft: 7 }}> NGN {bill}</Text>               
            </Item>

          </View>
          <View style={{marginTop: 10, marginBottom: 10, paddingBottom: 7}}>
            <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.bg_color}} block iconLeft>
            <Icon name='ios-cash' /> 
             <Text style={{color: '#fdfdfd'}}>Proceed</Text>
            </Button>
          </View>
        </Content>
      </Container>
      </ImageBackground>
    );
  }

  checkout() {
    const {payement, bill} = this.state
    if( payement.paymethod =='bank'){
      Actions.bank({paymentDetails: payement});
     }else if (payement.paymethod =='delivery'){
      Actions.confirmation({paymentDetails: payement});
     }else{
      Actions.pay({paymentDetails: payement, total: bill});
     }
  }


}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 50
    },

    backgroundImage: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    
  
  })
  