import React, { Component, PureComponent } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SectionList } from "react-native";
import { connect } from 'react-redux';
import API from '../../services/api';
import {
	addNote,
	updateNote,
	deleteNote
} from '../../redux/reducers/notes';
import commonStyles from '../../styles/main';
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';
import Table from '../../components/Table/index';
import Datepicker from '../../components/DatePicker/index';

class JournalDateScreen extends Component {
	static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
	     <Icon
	       name='book'
	       color='gray'
	      />
	   ),
  }
  state = {
  	day: '' 
  }
  componentWillMount () {
  	const {
  		navigation: {
  			state: {
  				params = {}
  			}
  		}
  	} = this.props;
  	
  	this.setState({
  		day: params.day || moment().format('DD.MM.YYYY')
  	})

  }
  // ---------- Actions Handlers start ----------

  onDatePickHandler = (pickedData) => {
  	this.setState({
  		day: pickedData.singleDate
  	})
  }
  onBlurHandler = (data) => {
  	console.log('BLUR DATA: ', data);

  	let body = {};
  	body[data.columnTitle] = data.changedValue;

  	const success = () => {
  		this.props.updateNote(data);
  	}
  	API.updateNote(body, data.id, success)
  }

  // ---------- Actions Handlers end ----------

  //---------- Pressing Actions start ----------

  addRowButtonPress = () => {
  	const success = (res) => {
  		this.props.addNote(res);
  	}
  	API.createNote({}, success)
  }
  onRemoveRowButtonPress = (id) => {
  	const success = () => {
  		this.props.deleteNote(id);
  	}
  	API.deleteNote(id, success)
  }

  //---------- Pressing Actions end ----------

	render() {
		const {
			day
		} = this.state;
		const tableFields = [
			{key: 'time'}, 
			{key: 'severity', isNumber: true}, 
			{key: 'duration', isNumber: true},
		];
		const tableFilters = [
			{
				key:'day', 
				singleFilterValue: this.state.day
			}
		]
		return (
			<ScrollView style={commonStyles.container}>
				<Datepicker
					periodPicking={false}
					onDatePick={this.onDatePickHandler}
					pickedDate={{
						singleDay: moment(day, 'DD.MM.YYYY').format('DD')
					}}
				/>
				<Table 
					data={this.props.data}
					filters={tableFilters}
					fields={tableFields}
					idPropName='_id'		
					onChange={this.onBlurHandler}
					onRemoveRowButtonPress={this.onRemoveRowButtonPress}
					addRowButtonPress={this.addRowButtonPress}
				/>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
  data: state.notes.data,
});

const mapDispatchToProps = dispatch => ({
	addNote: payload => dispatch(addNote(payload)),
	updateNote: payload => dispatch(updateNote(payload)),
	deleteNote: payload => dispatch(deleteNote(payload)),
});

export default Connected = connect(mapStateToProps, mapDispatchToProps)(JournalDateScreen);