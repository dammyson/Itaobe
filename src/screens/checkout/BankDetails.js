/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ImageBackground, AsyncStorage, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Content, Text,View, Grid, Col, Left, Right, Button, Icon, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon  from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


// Our custom files and classes import
import Colors from '../../resources/styles/colors';
import Navbar from '../navigations/Navbar';

export default class BankDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
        payement:{},
        user_id: '',
        session_id: '',
        loading: false,
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
      
        })

        if(this.props.paymentDetails) {
          this.setState({payement: this.props.paymentDetails});
          console.warn(this.props.paymentDetails);
        }
   
  }

  bankTransferVerification() {
    const { user_id, session_id ,payement} = this.state
   this.setState({ loading: true })
   const formData = new FormData();
   formData.append('feature', "order");
   formData.append('action', "bankVerify");
   formData.append('id', user_id,);
   formData.append('sid', session_id);

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
               })
               Actions.confirmation({paymentDetails: payement});

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
              <Text>Processing Order</Text>
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
        <ImageBackground
        source={require('../../assets/imgfour.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
        >
      <Container>
        <Navbar left={left} right={right} title="Bank Details" />
        <Content padder>
          <View>
            <Text style={{marginTop: 15, fontSize: 18}}>Bank Details</Text>

            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>           
            <Text style={{fontSize: 15, marginLeft: 7 }}>Bank Name: </Text>     
            <Text style={{fontSize: 15, marginLeft: 7 }}> Zenith</Text>               
            </Item>
            
           
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>           
            <Text style={{fontSize: 15, marginLeft: 7 }}>Account Name: </Text>     
            <Text style={{fontSize: 15, marginLeft: 7 }}> Ita Obe</Text>               
            </Item>

            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>           
            <Text style={{fontSize: 15, marginLeft: 7 }}>Account Number: </Text>     
            <Text style={{fontSize: 15, marginLeft: 7 }}> 1234567890</Text>               
            </Item>

           <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>           
            <Text style={{fontSize: 15, marginLeft: 7 }}>Account Sort Code: </Text>     
            <Text style={{fontSize: 15, marginLeft: 7 }}> 1567890</Text>               
            </Item>

          </View>
          <View style={{marginTop: 10, marginBottom: 10, paddingBottom: 7}}>
            <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.bg_color}} block iconLeft>
              <Text style={{color: '#fdfdfd'}}>I Have made payement</Text>
            </Button>
          </View>
        </Content>
      </Container>
      </ImageBackground>
    );
  }

  checkout() {
    this.bankTransferVerification();
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
  