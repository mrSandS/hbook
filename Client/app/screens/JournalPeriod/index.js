import React, { Component, PureComponent } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SectionList } from "react-native";
import { connect } from 'react-redux';
import API from '../../services/api';
import Utils from '../../services/utils';
import {
	fetchNotes,
	addNote,
	updateNote,
	deleteNote
} from '../../redux/reducers/notes';
import commonStyles from '../../styles/main';
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';
import Table from '../../components/Table/index';
import Datepicker from '../../components/DatePicker/index';

class JournalPeriodScreen extends Component {
	static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
	     <Icon
	       name='book'
	       color='gray'
	        />
	   ),
  };

	state = {
		pickedData: {}
	}
	componentWillMount () {
		const success = (res) => {
			this.props.fetchNotes(res)
		}
		API.listNotes(success);

		Utils.setThis(this);
	}

	//---------- Pressing Actions start ----------

	onChooseDayButtonPress = () => {
		Utils.navigateTo('JournalDate')
	}
	onDatePickButtonPress = (pickedData) => {
		this.setState({
			pickedData
		})
	}
	onPeriodRowPress = (note) => {
		Utils.navigateTo('JournalDate', {day: note.day})
	}
	addButtonPress = () => {

		const success = (res) => {
			this.props.addNote(res);
			Utils.navigateTo('JournalDate', {day: res.day})
		}

		API.createNote({}, success)
		
	}

	//---------- Pressing Actions end ----------

	render() {

		console.log('DATA: ', Utils.getDateAdjustedData(this.props.data))
		const tableFields = [
			{key: 'day', writable: false}, 
			{key: 'severity', writable: false}, 
			{key: 'quantity', writable: false}
		];
		const tableFilters = [
			{
				// key:'date', 
				// singleFilterValue: this.state.pickedData && this.state.pickedData.singleDate,
				// startFilterValue: this.state.pickedData && this.state.pickedData.startDate,
				// finalFilterValue: this.state.pickedData && this.state.pickedData.finalDate,
				// intervalFilterIsShowing: true
			}
		]

		return (
			<View>
				<ScrollView style={[commonStyles.container, styles.container]}>
					<Button
						title={'Choose Day'}
						containerViewStyle={{marginVertical: 12, flex:1}}
						onPress={this.onChooseDayButtonPress}
					/>
					<Datepicker
						periodPicking={true}
						onDatePick={this.onDatePickButtonPress}
					/>
					<Table 
						data={Utils.getDateAdjustedData(this.props.data)}
						filters={tableFilters}
						fields={tableFields}			
						onRowPress={this.onPeriodRowPress}		
					/>		
					<View style={{paddingVertical: 30}}></View>									
				</ScrollView>
				<TouchableOpacity
					style={styles.addButton}
				  onPress={this.addButtonPress}
				 >
				  <Text style={styles.addButtonText}>Add</Text>
				</TouchableOpacity>
			</View>			
		);
	}
}

const mapStateToProps = state => ({
  data: state.notes.data,
});

const mapDispatchToProps = dispatch => ({
	fetchNotes: payload => dispatch(fetchNotes(payload)),
  addNote: payload => dispatch(addNote(payload)),
  updateNote: payload => dispatch(updateNote(payload)),  
});

export default Connected = connect(mapStateToProps, mapDispatchToProps)(JournalPeriodScreen);

const styles = {
	container: {

	},
	addButton: {
		position:'absolute',
		bottom: 20,
		right: 20,
		padding: 5,
		borderRadius: 20,
		opacity: 0.5,
		backgroundColor: 'gray'
	},
	addButtonText: {
		fontSize: 18
	}
}