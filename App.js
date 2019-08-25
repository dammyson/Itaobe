/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React, {Component, AppRegistry} from 'react';
import AppNavigator from './src/screens/navigations/AppNavigator';
import Main from './src/screens/navigations/Menu';

export default class App extends Component{
 
  render() {
    return (
      <Main/>
    );
  }
}
 
