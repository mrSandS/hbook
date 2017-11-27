import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import commonStyles from '../../styles/main';
import styles from './styles';
import PropTypes from 'prop-types';

export default class Column extends Component {

	state={
		content: this.props.content
	}
	componentWillReceiveProps = (nextProps)=>{
		this.setState({
			content: nextProps.content
		})
	}
	onChangeTextHandler = (value)=>{
		console.log('Value: ', value)
		let valueToNumber;
		if (value && Number(value)) {
			valueToNumber = Number(value)
		} else {
			valueToNumber = null
		}
		this.setState({
			content: valueToNumber
		})
	}
	render () {

		const {
			writable,
			onBlurHandler
		} = this.props;

		return (
			<View style={styles.column}>
				{
					writable ?
					<TextInput 
						value={this.state.content && this.state.content.toString()}
						placeholder='Type...'
						style={[styles.content, styles.textInput]}
						underlineColorAndroid='transparent' 
						placeholderTextColor='#777'
						onBlur={()=>onBlurHandler(this.state.content)}
						onChangeText={this.onChangeTextHandler}
					/> :
					<Text style={[styles.content, styles.text]}>{this.state.content}</Text>
				}
			</View>
		); 
	}
}

Column.propTypes = {

};

Column.defaultProps = {
  writable: true
};