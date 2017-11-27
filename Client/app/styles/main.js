import { StyleSheet} from "react-native";

export default {
	container: {
		backgroundColor:'#FFFFFF',
		height:'100%',

	},
	contentContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	rowLeft: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	rowSpaceBetween: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	rowSpaceAround: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
};