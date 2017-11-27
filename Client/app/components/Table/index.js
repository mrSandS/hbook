import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import commonStyles from '../../styles/main';
import styles from './styles';
import Row from './Row';

export default class Table extends Component {

	state={
		data: [],
		filteredData: []
	}
	componentWillMount () {
		this.setState({
			data: this.props.data,
			filters: this.props.filters
		}, ()=>{
			this.dataFiltering(this.state.data, this.state.filters);
		})		
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			data: nextProps.data,
			filters: nextProps.filters,
		}, ()=>{
			this.dataFiltering(this.state.data, this.state.filters);
		})

	}
	dataFiltering = (inputData, filters) => {

		let filteredByFilters = [];

		// Filtering data by filters props

		if (filters) {
			inputData.forEach((dataUnit, dataUnitKeyInx)=>{
				let dataUnitKeys = Object.keys(dataUnit);
				let shouldDataUnitBeAdded = true;

				dataUnitKeys.forEach((dataUnitKey, dataUnitKeyInx)=>{

					if (!shouldDataUnitBeAdded) {
						return
					}
					filters.forEach((filter, filterInx, filters)=>{
						if (!shouldDataUnitBeAdded) {
							return
						}
						if (dataUnitKey !== filter.key) {
							return
						} else {
							if (filter.singleFilterValue && !filter.intervalFilterIsShowing) {
								if (filter.singleFilterValue !== dataUnit[dataUnitKey]) {		
									shouldDataUnitBeAdded = false;
									return
								}
							} else if (filter.startFilterValue && filter.finalFilterValue && filter.intervalFilterIsShowing){
								if (filter.startFilterValue > dataUnit[dataUnitKey] || dataUnit[dataUnitKey] > filter.finalFilterValue) {
									shouldDataUnitBeAdded = false;
									return
								}
							} else {
								shouldDataUnitBeAdded = false;
								return
							}
						}
					})
				})
				if ( shouldDataUnitBeAdded ) {
					filteredByFilters.push(dataUnit)
				}
			})
			this.setState({
				data: filteredByFilters
			})
		} else {
			this.setState({
				data: inputData,
			})
		}
	}
	onBlurHandler = (id, columnTitle, changedValue)=>{
		this.props.onChange({
			id,
			columnTitle,
			changedValue
		})
	}
	headerRender = () => {
		return <View style={commonStyles.rowSpaceAround}>
			{	
				this.props.fields.map((field, inx) => {
					let fieldText = field.key.charAt(0).toUpperCase() + field.key.slice(1);
					return <Text key={inx} style={styles.headerText}>{fieldText}</Text>
				})
			}
		</View>			
	}
	rowsRender = () => {
		// Rendering rows with filtered data in the state

		return this.state.data.map((dataUnit, dataUnitInx) => {
			const id = this.props.idPropName;
			const row = <Row 
				key={!this.props.onRowPress ? dataUnitInx : null}
				columnsContent={dataUnit} 
				fields={this.props.fields} 
				onBlurHandler={(columnTitle, changedValue) => this.onBlurHandler(dataUnit[id], columnTitle, changedValue)}
				onRemoveRowButtonPress={this.props.onRemoveRowButtonPress}
				idPropName={this.props.idPropName}
			/>
			return (
				this.props.onRowPress ?
				<TouchableOpacity key={dataUnitInx} onPress={()=>this.props.onRowPress(dataUnit)}>
					{row}
				</TouchableOpacity> :
				row
			)
		})
	}
	render () {
		const {
			data,
			fields,
			fieldsInHeader,
			addRowButtonPress
		} = this.props;

		return (
			<View>
				{
					this.headerRender()
				}
				{
					this.rowsRender()
				}
				{
					addRowButtonPress ?
					<TouchableOpacity
						onPress={addRowButtonPress}
					>
						<Text>Add New</Text>
					</TouchableOpacity> :
					null
				}				
			</View>
		); 
	}
}

Table.propTypes = {
	data: PropTypes.array,
	fields: PropTypes.array,
	filters: PropTypes.array,
	onChange: PropTypes.func,
	onRowPress: PropTypes.func,
	onRemoveRowButtonPress: PropTypes.func,
	idPropName: PropTypes.string

};

Table.defaultProps = {
	idPropName: 'id'
};