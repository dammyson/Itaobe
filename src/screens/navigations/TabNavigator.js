import React from "react";
import { Platform } from "react-native";
import { Button, Text, Badge } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Colors from './../../resources/styles/colors';


import SignIn from '../users/SignIn';
import SignUp from '../users/SignUP';
import Home from './../Home';
import ListGrid from '../Listing/ListGrid';
import ListSwiper from '../Listing/ListSwiper';

const HomeStack = createStackNavigator(
  {
    Home: Home
  },
  { headerMode: "none" }
);

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={{ color: focused ? "white" : "#FFF5EE" }}>Home</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <Icon
    name="home"
      style={{
        color: focused ? "white" : "#FFF5EE"
      }}
      size={20}
      type="font-awesome"
    />
  )
};

const AccountStack = createStackNavigator(
  {
    ListGrid: ListGrid
  },
  { headerMode: "none" }
);

AccountStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={{ color: focused ? "white" : "#D3D3D3" }}>Wishlist</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <Icon
      name='heart'
      style={{
        color: focused ? "white" : "#D3D3D3"
      }}
      size={20}
      type="font-awesome"
    />
  ),
  headerMode: "none"
};


AppNavigator= createBottomTabNavigator(
  {
    HomeStack,
    AccountStack,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: Colors.bg_color
      }
    }
  }
);

const App = createAppContainer(AppNavigator);

export default App;