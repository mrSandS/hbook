import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import commonStyles from '../../styles/main';
import styles from './styles';

export default class DatePicker extends Component {

	state={
		pickedDate: {}
	}
	componentWillMount () {
		this.setState({
			periodPicking: this.props.periodPicking,
			pickedDate: this.props.pickedDate || {}
		})
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			periodPicking: nextProps.periodPicking
		})
	}

	datePickHandler = () => {
		const {
			singleDay = '11',
			singleMonth = '11',
			singleYear = '2017',
			startDay = '11',
			startMonth = '11',
			startYear = '2017',
			finalDay = '11',
			finalMonth = '11',
			finalYear = '2017'
		} = this.state.pickedDate;
		let pickedData;
		if (this.state.periodPicking) {
			if (startDay&&startMonth&&startYear&&finalDay&&finalMonth&&finalYear) {
				pickedData = {
					startDate: `${startDay}.${startMonth}.${startYear}`,
					finalDate: `${finalDay}.${finalMonth}.${finalYear}`
				}
			} else {
				alert('You missed some period field')
			}
		} else {
			if (singleDay&&singleMonth&&singleYear) {
				pickedData = {
					singleDate: `${singleDay}.${singleMonth}.${singleYear}`
				}				
			} else {
				alert('You missed some date field')
			}		
		}
		this.props.onDatePick(pickedData);
	}
	startDateHandler = (text, dateType) => {
		switch (dateType) {
			case 'day':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						startDay: text
					}					
				});
			break;

			case 'month':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						startMonth: text
					}					
				});
			break; 

			case 'year':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						startYear: text
					}					
				});
			break;
		}
	}
	finalDateHandler = (text, dateType) => {
		switch (dateType) {
			case 'day':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						finalDay: text
					}					
				});
			break;

			case 'month':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						finalMonth: text
					}					
				});
			break; 

			case 'year':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						finalYear: text
					}					
				});
			break;
		}
	}
	singleDateHandler = (text, dateType) => {
		switch (dateType) {
			case 'day':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						singleDay: text
					}					
				});
			break;

			case 'month':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						singleMonth: text
					}					
				});
			break; 

			case 'year':
				this.setState({
					pickedDate: {
						...this.state.pickedDate,
						singleYear: text
					}					
				});
			break;
		}
	}
	render () {

		const {
			periodPicking,
			onDatePick
		} = this.props;

		const {
			singleDay,
			singleMonth,
			singleYear,
			startDay,
			startMonth,
			startYear,
			finalDay,
			finalMonth,
			finalYear
		} = this.state.pickedDate;

		return (
			<View>
				{
				 	this.state.periodPicking ?
				 	<View>
					 	<View>
					 		<Text>
					 			From:
					 		</Text>
					 		<View style={commonStyles.rowSpaceAround}>
					 			<TextInput
					 				style={{flex:1, height: 40}} 
					 				placeholder='day'
					 				onChangeText={(evt) => this.startDateHandler(evt, 'day')}
					 				value={startDay}
					 			/>
					 			<TextInput
					 				style={{flex:1, height: 40}} 
					 				placeholder='month'
					 				onChangeText={(evt) => this.startDateHandler(evt, 'month')}
					 				value={startMonth}
					 			/>
					 			<TextInput
					 				style={{flex:1, height: 40}} 
					 				placeholder='year'
					 				onChangeText={(evt) => this.startDateHandler(evt, 'year')}
					 				value={startYear}
					 			/>
					 		</View>
					 	</View>

					 	<View>
					 		<Text>
					 			To:
					 		</Text>
					 		<View style={commonStyles.rowSpaceAround}>
					 			<TextInput
					 				style={{flex:1, height: 40}} 
					 				placeholder='day'
					 				onChangeText={(evt) => this.finalDateHandler(evt, 'day')}
					 				value={finalDay}
					 			/>
					 			<TextInput
					 				style={{flex:1, height: 40}} 
					 				placeholder='month'
					 				onChangeText={(evt) => this.finalDateHandler(evt, 'month')}
					 				value={finalMonth}
					 			/>
					 			<TextInput
					 				style={{flex:1, height: 40}} 
					 				placeholder='year'
					 				onChangeText={(evt) => this.finalDateHandler(evt, 'year')}
					 				value={finalYear}
					 			/>
					 		</View>
					 	</View>
					</View> :  

				 	<View>
				 		<View style={commonStyles.rowSpaceAround}>
				 			<TextInput
				 				style={{flex:1, height: 40}} 
				 				placeholder='day'
				 				value={singleDay}
				 				onChangeText={(evt) => this.singleDateHandler(evt, 'day')}
				 			/>
				 			<TextInput
				 				style={{flex:1, height: 40}} 
				 				placeholder='month'
				 				value={singleMonth}
				 				onChangeText={(evt) => this.singleDateHandler(evt, 'month')}
				 			/>
				 			<TextInput
				 				style={{flex:1, height: 40}} 
				 				placeholder='year'
				 				value={singleYear}
				 				onChangeText={(evt) => this.singleDateHandler(evt, 'year')}
				 			/>
				 		</View>
				 	</View>
				}
				<Button
				  title='Pick'
				  containerViewStyle={{marginVertical: 12, flex:1}}
				  onPress={this.datePickHandler}
				/>
			</View>
		); 
	}
}

DatePicker.propTypes = {

};

DatePicker.defaultProps = {

};