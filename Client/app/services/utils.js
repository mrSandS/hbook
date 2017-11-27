

class Utils {
	that = null;

	getDateAdjustedData (data) {
		// Displaying multiplying indicies for one day 
		let newDataUnit;
		let quantity = 0;
		const dateAdjustedData = [];

		data.forEach((dataUnit, dataUnitInx) => {
			// If the note is not the first and
			// if day is the same as day of previous note
			if (newDataUnit && newDataUnit.day === dataUnit.day) {
				quantity += 1;
				newDataUnit = {
					...newDataUnit,
					severity: newDataUnit.severity + dataUnit.severity,
					duration: newDataUnit.duration + dataUnit.duration,
					quantity
				}

			} 
			// If the note is the first or
			// note's day is diferent from the previous
			else if (!newDataUnit || newDataUnit.day !== dataUnit.day) {
				// If the note is not the first and it has new day
				if (newDataUnit) {
					dateAdjustedData.push(newDataUnit);
				}				
				// As the note has a new day, notes quantity is 1 
				quantity = 1;
				newDataUnit = {
					...dataUnit,
					quantity
				}
			}
			// If the note is the last one
			if (dataUnitInx === data.length-1) {
				dateAdjustedData.push(newDataUnit)
			}
		})
		return dateAdjustedData;
	}

	navigateTo (screen, params) {
		that.props.navigation.navigate(screen, params)	
	}

	setThis (comp) {
		that = comp;
	}

}

const $Utils = new Utils();

export default $Utils;