import React, { Component, PureComponent } from "react";

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import store from './redux'
import { connect } from 'react-redux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";

import Login from './screens/AuthLogin';
import Signup from './screens/AuthSignup';
import JournalPeriod from './screens/JournalPeriod/index.js';
import JournalDate from './screens/JournalDate/index.js';
import Medicine from './screens/Medicine/index.js';
import Charts from './screens/Charts/index.js';
import Dashboard from './screens/Dashboard/index.js';

const Main = TabNavigator({
  JournalPeriod: { screen: JournalPeriod },
  Medicine: { screen: Medicine },
  Charts: { screen: Charts },
  Dashboard: { screen: Dashboard },
},
{
  tabBarOptions: {
    activeTintColor: 'blue',
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0.5,
      borderTopColor: '#777'
    },
  },
  tabBarPosition: 'bottom' 
});

const Navigation = StackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Main: {
    screen: Main
  },
  JournalDate: {
    screen: JournalDate
  }
}) 

export const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}