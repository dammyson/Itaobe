
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View,Image, Alert, ActivityIndicator} from 'react-native';
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
        console.warn("error", data);
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
         raveVerification() {
          const { user_id, session_id ,payement} = this.state
         this.setState({ loading: true })
         const formData = new FormData();
         formData.append('feature', "order");
         formData.append('action', "DeliveryVerify");
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
      
                     Alert.alert(
                      'Success',
                      'Order registered succesfully',
                      [
                        {text: 'Cancel', onPress: () => Actions.confirmation({paymentDetails: payement})},
                        {text: 'OK', onPress: () =>   Actions.confirmation({paymentDetails: payement})},
                      ],
                      { cancelable: false }
                    )
      
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
        const {email,fname, lname, ammount} = this.state
        console.warn(ammount);
    if (email != "" || fname != "" || lname != "" ||  ammount > 0) {
      return (
        <Rave 
        amount='100'
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


