
import React, {Component} from 'react';
import {ActivityIndicator,ScrollView, KeyboardAvoidingView, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,Alert, TextInput} from 'react-native';
import { Card, Icon,SocialIcon} from 'react-native-elements'
import colors from './../../resources/styles/colors'
import { Actions } from 'react-native-router-flux';
export default class SignUP extends Component{

  constructor(props) 
  {
      super(props);
      this.state = {
        loading: false,
        email: "", 
        phone: "", 
        uname: "", 
        lname: "", 
        lname: "", 
        password: "",
                  }

  }

  checkReg()
    {
    
        const {email,phone, uname, fname, lname,  password} = this.state

          if(email == "" || password == "" || phone == "" || uname == "" || lname == ""|| fname == ""){
            Alert.alert('Validation failed', 'field(s) cannot be empty', [{text: 'Okay'}])
            return
          }
        this.setState({ loading: true})
        const formData = new FormData();
        formData.append('feature', "user");
        formData.append('action', "register");
        formData.append('pwd', password);
        formData.append('email', email);
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('uname', uname);
        formData.append('mobile', phone);
        formData.append('telephone', phone);
        formData.append('memword', "food");
        formData.append('day', "2");
        formData.append('month', "2");
        formData.append('year', "1990");
        formData.append('gender', "M");

        fetch('https://www.ita-obe.com/mobile/v1/user.php', { method: 'POST',  headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, body:formData,  
        })
        .then(res => res.json())
        .then(res => {
          console.warn(res);
          if(!res.error){
          this.setState({ loading: false})
          Actions.login();

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
    return (
      <ImageBackground
      source={require('../../assets/imgfour.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
      >
      <View style={styles.container}>
    
         <View style={styles.slidetop}>
         <Text style={styles.getW}>Get started</Text>
         </View>
         <View style={styles.slidemid}>
        
                <Text style={styles.headW}>sign up with</Text>
                <KeyboardAvoidingView style={{ flex: 1,  flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
                   <ScrollView >

                     <View style={{paddingBottom:100}}>
                    <View style={styles.card} >
                         <TextInput
                          placeholder= "Email"
                          placeholderTextColor= '#000'
                          returnKeyType = "next"
                          onSubmitEditing = {() => this.passwordInput.focus()}
                          keyboardType = "numeric"
                          autoCapitalize= "none"
                          autoCorrect = {false}
                          style = {styles.input}
                          onChangeText = {text => this.setState({email: text})}
                          />  
                          <View style = {styles.lineStyle} />
                          <TextInput
                          placeholder= "First Name"
                          placeholderTextColor= '#000'
                          returnKeyType = "next"
                          onSubmitEditing = {() => this.passwordInput.focus()}
                          keyboardType = "numeric"
                          autoCapitalize= "none"
                          autoCorrect = {false}
                          style = {styles.input}
                          onChangeText = {text => this.setState({fname: text})}
                          />  
                          <View style = {styles.lineStyle} />


                          <TextInput
                          placeholder= "Last name"
                          placeholderTextColor= '#000'
                          returnKeyType = "next"
                          onSubmitEditing = {() => this.passwordInput.focus()}
                          keyboardType = "numeric"
                          autoCapitalize= "none"
                          autoCorrect = {false}
                          style = {styles.input}
                          onChangeText = {text => this.setState({lname: text})}
                          />  
                          <View style = {styles.lineStyle} />

                           <TextInput
                          placeholder= "Username"
                          placeholderTextColor= '#000'
                          returnKeyType = "next"
                          onSubmitEditing = {() => this.passwordInput.focus()}
                          keyboardType = "numeric"
                          autoCapitalize= "none"
                          autoCorrect = {false}
                          style = {styles.input}
                          onChangeText = {text => this.setState({uname: text})}
                          />  
                          <View style = {styles.lineStyle} />


                        <TextInput
                            placeholder= "Phone"
                            placeholderTextColor= '#000'
                            returnKeyType = "next"
                            onSubmitEditing = {() => this.passwordInput.focus()}
                            keyboardType = "numeric"
                            autoCapitalize= "none"
                            autoCorrect = {false}
                            style = {styles.input}
                            onChangeText = {text => this.setState({phone: text})}
                            />  
                        <View style = {styles.lineStyle} />
                        <TextInput
                            placeholder= "Password"
                            secureTextEntry
                            placeholderTextColor= '#000'
                            returnKeyType = "next"
                            onSubmitEditing = {() => this.passwordInput.focus()}
                            keyboardType = "numeric"
                            autoCapitalize= "none"
                            autoCorrect = {false}
                            style = {styles.input}
                            onChangeText = {text => this.setState({password: text})}
                            />  
                          
                      </View>   
                 
        
                    <Text style={{ marginLeft:20, fontSize: 14, marginRight:12, marginBottom:20, marginTop:10,  textAlign: 'center',fontWeight: '500',}}> 
                    By clicking on the create account button you agree with our <Text style={{fontWeight: 'bold'}}>Term of service </Text> and  
                    <Text style={{fontWeight: 'bold'}}> Privacy Policy</Text>
                     </Text> 
                     <View style={styles.buttonView}>
                     <TouchableOpacity style={styles.buttonContainer} 

                     onPress ={() => this.checkReg()} >
                        <Text style={styles.buttonText}
                      >Sign Up</Text>

                    </TouchableOpacity>
                    </View>
                      <View style={styles.bottom}>
                            <Text >Already have an account?</Text>
                            <Text  style={{fontWeight: 'bold',  marginLeft:10,}}
                              onPress ={() => Actions.login({email: "jesus"})}>Log In</Text>
                      </View>
                      </View>
                       </ScrollView>
                  </KeyboardAvoidingView>

         </View>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  slidetop: {
    flex: 1, 
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding:2,
  },
  socialtop:{
    height:25,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
  },
  slidemid: {
    flex: 5,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  input:{
    height:40,
    marginBottom:10,
    marginTop:10,
    color: '#0c0c0c',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft:10,
    marginRight:10,
    fontSize: 15,
    fontWeight: '400',
    backgroundColor: '#ffe6e6',


},
  text: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:25,
    marginRight:25,
    textAlign: 'center',
  },
  buttonContainer:{
    height:45,
    backgroundColor: colors.bg_color,
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
  },
  headTextW:{
    color: "#FFF",
    fontWeight: '900',
    fontSize:15,
    textAlign:'left',
    marginTop:15
  },
  getW:{
    color: "#000",
    fontWeight: '500',
    fontSize:30,
    textAlign:'left',
    marginBottom:25,
    marginLeft: 20,
    marginRight: 20,
  },
  bottom:{
    height:30,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10
  },
  card: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
    
   
  
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'#cfd0d1',
   
},
headW:{
    color: "#7a7a7a",
    fontWeight: '900',
    fontSize:19,
    textAlign:'left',
    marginBottom:10,
    marginLeft:25,
    marginTop:10,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    padding:10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    margin:20
  },
   circle: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginRight:10
 },
})
