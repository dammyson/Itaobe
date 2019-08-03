
import React, {Component} from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { Card, Icon,SocialIcon} from 'react-native-elements'
import assetHelper from '../../assets/assetsHelper'
export default class SignUP extends Component{

  constructor(props) 
  {
      super(props);
      this.state = {
        loading: false,
        email: "", 
        phone: "", 
        name: "", 
        password: ""
                  }

  }

  checkReg()
    {
    
        const {email,phone, name, password} = this.state

          if(email == "" || password == "" || name == "" || phone == "" ){
            Alert.alert('Validation failed', 'field(s) cannot be empty', [{text: 'Okay'}])
            return
          }
        this.setState({ loading: true})
        fetch(URL.url+'/api/register', { method: 'POST',  headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),  })
        .then(res => res.json())
        .then(res => {

          if(res.status){
          this.setState({ loading: false})
          this.props.navigation.navigate('Login')

          }else{

        Alert.alert('Login failed', "Check your email and password", [{text: 'Okay'}])
        this.setState({ loading: false})
          }
        }).catch((error)=>{
          console.log("Api call error");
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
         <Text style={styles.headW}></Text>
         <View  style={styles.socialtop}>
             
   </View>

       
         </View>
         <View style={styles.slidemid}>
        
                <Text style={styles.headW}>sign up with</Text>
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
                    onChangeText = {text => this.setState({username: text})}
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
                    onChangeText = {text => this.setState({username: text})}
                    />  
                <View style = {styles.lineStyle} />
                <TextInput
                    placeholder= "******"
                    secureTextEntry
                    placeholderTextColor= '#000'
                    returnKeyType = "next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    keyboardType = "numeric"
                    autoCapitalize= "none"
                    autoCorrect = {false}
                    style = {styles.input}
                    onChangeText = {text => this.setState({username: text})}
                    />  
                    <View style = {styles.lineStyle} />
                <TextInput
                    placeholder= "******"
                    secureTextEntry
                    keyboardType = "numeric"
                    placeholderTextColor= '#000'
                    returnKeyType= "go"
                    style = {styles.input}
                    onChangeText = {text => this.setState({password: text})}
                    ref={(input)=> this.passwordInput = input}
                    />

 </View>
         </View>
         <View style={styles.slidebases}>
                    <Text style={{ marginLeft:20, fontSize: 14, marginRight:12, marginBottom:20, textAlign: 'center',fontWeight: '500',}}> 
                    By clicking on the create account button you agree with our <Text style={{fontWeight: 'bold'}}>Term of service </Text> and  
                    <Text style={{fontWeight: 'bold'}}> Privacy Policy</Text>
                   </Text> 
         <TouchableOpacity style={styles.buttonContainer} 
           onPress ={() =>  this.props.navigation.navigate('SignUp')} >
            <Text style={styles.buttonText}
          >Sign Up</Text>

          </TouchableOpacity>
          <View style={styles.bottom}>
                <Text >Already have an account?</Text>
                 <Text  style={{fontWeight: 'bold',  marginLeft:10,}}
                  onPress ={() =>  this.props.navigation.navigate('SignIn')}>Log In</Text>
          </View>
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
    flex: 3, 
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
    flex: 3,
  },
  slidebases: {
    flex: 2,
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
    fontSize: 18,
    fontWeight: '600',


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
    height:50,
    backgroundColor: assetHelper.bgcolor,
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
   
  
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
