
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View,Image, Alert, TouchableOpacity} from 'react-native';
import Rave from 'react-native-rave';

export default class Pay extends Component{

    constructor(props) {
        super(props);
        this.state = {
            auth:"",
            fname:"",
            lname:"",
            email:"",
            id:"",
            ammount:100,
            payement:{},
      
          };
          this.onSuccess = this.onSuccess.bind(this);
          this.onFailure = this.onFailure.bind(this);
      }
    
      onSuccess(data) {
        Actions.pay({paymentDetails: payement});
      }
    
      onFailure(data) {
        console.log("error", data);
      }
      onClose(data) {
        console.log("error", data);
      }


      componentWillMount() {
      
        AsyncStorage.getItem('email').then((value) => this.setState({ email: value.toString()}))
        AsyncStorage.getItem('first').then((value) => this.setState({ fname: value.toString()}))
        AsyncStorage.getItem('last').then((value) => this.setState({ lname: value.toString()}))
        if(this.props.paymentDetails) {
            this.setState({payement: this.props.paymentDetails, ammount: this.props.total});
            console.warn(this.props.paymentDetails);
          }
       
         }


    render() {
        const {email,fname, lname, ammount} = this.state
        console.warn(ammount);
    if (email != "" || fname != "" || lname != "" ||  ammount > 0) {
      return (
        <Rave 
        amount={ammount} 
        country="NG" 
        currency="NGN" 
        email="voecmmce"
        firstname="Ayeni"
        lastname="Ayoba"
        publickey="FLWPUBK_TEST-22d34551ee18e239ebc5352e72aee939-X" 
        secretkey="FLWSECK_TEST-f485459a1cd272596d0d303039e43367-X" 
        encryptionkey="FLWSECK_TEST617e95564acd"
        meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]}
        production={false} 
        onSuccess={res => this.onSuccess(res)} 
        onFailure={e => this.onFailure(e)}
        onClose={e => this.onClose(e)}
        />
    );
    }else{
      return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color:URL.bgcolor, fontWeight: '900',  fontSize:16,}}>Loading...</Text>
    </View>
    );
    }
  };
  
}


