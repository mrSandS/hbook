import React, { Component, PureComponent } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, AsyncStorage } from "react-native";
import commonStyles from '../../styles/main';
import { Icon, Button } from 'react-native-elements';
import $http from '../../services/http';
import { connect } from 'react-redux';

class Dashboard extends Component {
	static navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ tintColor }) => (
         <Icon
           name='info'
           color='gray'
            />
       ),
  }

  logOutButtonPress = () => {
    $http.setSessionToken(null);
    AsyncStorage.removeItem('AuthToken');
    this.props.navigation.navigate('Login')
    console.log('AUTH_TOKEN: ', $http.authToken)

  }
  checkButtonPress = () => {
    AsyncStorage.getItem('AuthToken')
      .then(token => {
        if (token) {
          console.log('Token From Storage: ', token)
        }         
      })
  }

	render() {
    console.log('USER: ', this.props.user)
    return <ScrollView style={styles.container}>

      <View style={[styles.wrapper, styles.nameWrapper]}>
        <Icon 
          name='account-circle' 
          size={35} 
          color='gray' 
          style={[styles.icon, styles.iconStyle]}
        />
        <Text style={[styles.text, styles.nameTextStyle]}>{this.props.user.name}</Text>
      </View>

      <View style={[styles.wrapper, styles.emailWrapper]}>
        <Icon 
          name='mail' 
          size={35} 
          color='gray' 
          style={[styles.icon, styles.iconStyle]}
        />
        <Text style={[styles.text, styles.emailTextStyle]}>{this.props.user.email}</Text>
      </View>

      <Button
        title={'Log Out'}
        containerViewStyle={styles.logOutButton}
        onPress={this.logOutButtonPress}
      />

    </ScrollView>
	}
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({

});

const $ = commonStyles;

const styles = {
  container: {
    ...$.container,
    // ...$.contentContainer,
    padding: 20,
  },
  icon: {
    marginRight: 10
  },
  text: {
    fontSize: 16
  },
  wrapper: {
    ...$.rowLeft,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#777',
  },
  nameWrapper: {
    ...$.rowLeft
  },
  nameIconStyle: {

  },
  nameTextStyle: {

  },
  emailWrapper: {
    
  },
  emailIconStyle: {

  },
  emailTextStyle: {
    
  },
  logOutButton: {
    marginVertical: 12, 
    flex:1
  }
}

export default Connected = connect(mapStateToProps, mapDispatchToProps)(Dashboard);