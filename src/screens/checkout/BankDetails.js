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

export default class BankDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
        payement:{},

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




  render() {


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
    const {payement, bill} = this.state
    Actions.confirmation({paymentDetails: payement});
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
  