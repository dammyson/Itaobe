
import React, {Component} from 'react';
import {Platform, StyleSheet, AsyncStorage, View, Image, Dimensions, ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Splash extends Component{

    performinTimeConsumingTask = async()=> {
      return new Promise((resolve) => {
          setTimeout(
            ()=> {resolve('result')},
            3000
          )
        })
    }

  async componentDidMount(){
    AsyncStorage.setItem('aut', "no");
    const data = await this.performinTimeConsumingTask();
    if(data !== null){
      Actions.pop();
      Actions.home({email: "jesus"});
     
     //this.props.navigation.navigate('Home');
    }
  }

  render() {
    return (
      <ImageBackground
      source={require('../../assets/ss_bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
      >

      <View style={styles.container}>
     
      </View>
      </ImageBackground>
    );
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
    width:300,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    
    
}
,
});
