import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import commonStyles from '../../styles/main';
import styles from './styles';
import Column from './Column';

export default class Row extends Component {

	rowRender = () => {
		const {
			columnsContent,
			fields,
			onBlurHandler
		} = this.props;

		const rowColumnsTitles = Object.keys(columnsContent);
		let rowLayout = [];

		fields.forEach((field, fieldInx) => {
			rowColumnsTitles.forEach((rowColumnTitle, rowColumnTitleInx)=>{
				if (field.key === rowColumnTitle) {
					const column = <Column 
						key={rowColumnTitleInx}
						content={columnsContent[rowColumnTitle]}
						writable={field.writable}
						isNumber={field.isNumber}
						onBlurHandler={(changedValue)=>{
							onBlurHandler(rowColumnTitle, changedValue)
						}}
					/> 
					rowLayout.push(column);
				}	
			})
		})

		return rowLayout					
	}
	render() {

		const {
			containerStyle,
			columnsContent,
			idPropName,
			onRemoveRowButtonPress
		} = this.props;
		const id = idPropName;
		return (
			<View style={[commonStyles.rowSpaceAround, styles.rowContainer, containerStyle]}>
				{	
					this.rowRender()
				}
				{
					this.props.onRemoveRowButtonPress ?
					<TouchableOpacity
						style={{
							position: 'absolute',
							top: 3,
							right: 6
						}}
						onPress={()=>onRemoveRowButtonPress(columnsContent[id])}
					>
						<Text
							style={{
								fontSize: 10
							}}
						>
							Remove
						</Text>
					</TouchableOpacity> :
					null
				}	
			</View>
		);
	}
}

Row.propTypes = {

};

Row.defaultProps = {
	idPropName: 'id'
};