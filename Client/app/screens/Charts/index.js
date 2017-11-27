import React, { Component, PureComponent } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

export default class Charts extends Component {
	static navigationOptions = {
    tabBarLabel: 'Charts',
    tabBarIcon: ({ tintColor }) => (
         <Icon
           name='assessment'
           color='gray'
            />
       ),
  };
	render() {
		return <Text>Charts</Text>
	}
}