/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ImageBackground, AsyncStorage, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
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
        bill:'',
        loading: false,


      };
  }


  render() {
    const {payement, bill} = this.state

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
        <ImageBackground
        source={require('../../assets/imgfour.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
        >
      <Container>
        <Navbar left={left} right={right} title="Confirm" />
        <Content padder>
          <View>
            <Text style={{marginTop: 15, fontSize: 18, fontWeight: '700',}}>Contact Details</Text>

             <Text style={{marginTop: 15, fontSize: 18,}}>Address:</Text>
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>              
            <Text style={{fontSize: 15, marginLeft: 7 }}>The Farmlands, Plot 122, Magazine Road, Jericho Ibadan. Oyo State Nigeria</Text>               
            </Item>
            
            <Text style={{marginTop: 15, fontSize: 18,}}>Phone no: </Text>
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>            
            <Text style={{fontSize: 15, marginLeft: 7 }}>+2347042000183</Text>               
            </Item>

             
             <Text style={{marginTop: 15, fontSize: 18,}}>Phone no 2: </Text>
            <Item regular style={{marginTop: 7, paddingTop: 15, paddingBottom: 15,}}>            
            <Text style={{fontSize: 15, marginLeft: 7 }}>+2347042000184</Text>               
            </Item>

          </View>
        </Content>
      </Container>
      </ImageBackground>
    );
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
  