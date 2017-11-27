import React, { Component, PureComponent } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

export default class Medicine extends Component {
	static navigationOptions = {
    tabBarLabel: 'Medicine',
    tabBarIcon: ({ tintColor }) => (
         <Icon
           name='local-hospital'
           color='gray'
            />
       ),
  };
	render() {
		return <Text>Medicine</Text>
	}
}