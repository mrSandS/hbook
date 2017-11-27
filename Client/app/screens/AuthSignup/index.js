import React, { Component, PureComponent } from "react";
import { 
	StyleSheet, 
	Text, 
	View, 
	ScrollView, 
	TouchableOpacity, 
	TextInput, 
	SectionList,
	AsyncStorage 
} from "react-native";
import API from '../../services/api';
import $http from '../../services/http';
import { connect } from 'react-redux';
import commonStyles from '../../styles/main';
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';
import Table from '../../components/Table/index';
import Datepicker from '../../components/DatePicker/index';

class LoginScreen extends Component {

	static navigationOptions = { 
		header: null
	}

	state = {
		// loginValue: 'user',
		// emailValue: 'email2@email.com',
		// passwordValue: 'qweqweqwe2'
		loginValue: '',
		emailValue: '',
		passwordValue: ''
	}
	componentDidMount () {

	}

	navigateTo = (screen, params) => {
		this.props.navigation.navigate(screen, params)	
	}

	//---------- Getting data start ----------

	//---------- Getting data end ----------

	//---------- Actions start ----------	

	onLoginTextChange = (value) => {
		this.setState({
			loginValue: value
		})
		
	}
	onEmailTextChange = (value) => {
		this.setState({
			emailValue: value
		})
	}
	onPasswordTextChange = (value) => {
		this.setState({
			passwordValue: value
		})
	}

	//---------- Actions end ----------

	//---------- Pressing Actions start ----------

	onCreateButtonPress = () => {

		const {
			loginValue,
			emailValue,
			passwordValue
		} = this.state;
		const body = {
			name: loginValue, 
			email: emailValue, 
			password: passwordValue
		};
		API.authSignup(body)
			.then(res => {
				if (res.success) {
					API.authLogin(body)
						.then(res => {
							if (res.success) {
								AsyncStorage.setItem('AuthToken', res.token)
								this.navigateTo('Main');
							}
							console.log('LogIn Response: ', res)	
						})
				}
				console.log('SignUp Response: ', res)	
			})

	}
	onBackToLoginButtonPress = () => {
		this.navigateTo('Login');
	}
	//---------- Pressing Actions end ----------

	render() {

		const {
			loginValue,
			emailValue,
			passwordValue
		} = this.state;

		return (
			<View style={styles.container}>
				<View style={styles.loginInputWrapper}>
					<TextInput 
						style={styles.loginInput}
						onChangeText={this.onLoginTextChange}
						value={loginValue}
						placeholder='Your login'
					/>
				</View>
				

				<View style={styles.emailInputWrapper}>
					<TextInput 
						style={styles.emailInput}
						onChangeText={this.onEmailTextChange}
						value={emailValue}
						placeholder='Your email'
					/>
				</View>

				<View style={styles.passwordInputWrapper}>				
					<TextInput 
						style={styles.passwordInput}
						onChangeText={this.onPasswordTextChange}
						value={passwordValue}
						placeholder='Your password'
					/>
				</View>
				<Button 
					onPress={this.onCreateButtonPress}
					icon={{name: 'perm-identity', size: 30}}
					title='Create'
					fontSize={16}
					containerViewStyle={styles.signupButtonContainer}
					buttonStyle={styles.signupButton}
					textStyle={styles.signupButtonText}
				/>
				<Button 
					onPress={this.onBackToLoginButtonPress}
					icon={{name: 'arrow-back', size: 30}}
					title='Back to Login'
					fontSize={16}
					containerViewStyle={styles.loginButtonContainer}
					buttonStyle={styles.loginButton}
				/>
			</View>			
		);
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default Connected = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = {
	container: {
		height: '100%',
		padding: 20,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginInputWrapper: {
		width: '100%'
	},
	loginInput: {

	},
	emailInputWrapper: {
		width: '100%'
	},
	emailInput: {

	},
	passwordInputWrapper: {
		width: '100%'
	},
	passwordInput: {

	},
	loginButtonContainer: {
		marginTop: 10,
		width: '100%'
	},
	loginButton: {
		backgroundColor: '#777'
	},
	signupButtonContainer: {
		marginTop: 20,
		width: '100%',
		
	},
	signupButton: {
		backgroundColor: '#000'
	},
	signupButtonText: {
		// color: '#333'
	}
}