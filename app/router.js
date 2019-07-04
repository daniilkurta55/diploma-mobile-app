import React, {Component} from 'react';
import {Platform, StatusBar} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import HistoryContainer from './screens/Transactions/HistoryContainer';
import Send from './screens/Transactions/Send';
import Profile from './screens/Profile';
import ChangePassword from './screens/Profile/ChangePassword';
import PdfView from './screens/PdfView';

console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;


const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
    }
  }
});

const ProfileRoute = createStackNavigator({
  Profile: {screen: Profile}
});

const SendRoute = createStackNavigator({
  Send: {
    screen: Send,
    navigationOptions: {
      title: 'Choose receiver',
    }
  }
});

const HistoryRoute = createStackNavigator({
  HistoryContainer: {
    screen: HistoryContainer,
    navigationOptions: {
      header: null
    }
  }
});

const MainNavigator = createBottomTabNavigator(
  {
    Send: {
      screen: SendRoute,
      navigationOptions: {
        tabBarLabel: 'Send',
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="paper-plane" size={20} color={tintColor}/>
        )
      }
    },
    HistoryContainer: {
      screen: HistoryRoute,
      navigationOptions: {
        header: null,
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="history" size={20} color={tintColor}/>
        )
      }
    },
    Profile: {
      screen: ProfileRoute,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="user" size={20} color={tintColor}/>
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: 0
      }
    }
  }
);

const SignedIn = createStackNavigator({
  MainNavigator: {
    screen: MainNavigator,
    navigationOptions: {
      header: null
    }
  },
  PdfView: {
    screen: PdfView
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      title: null
    }
  }
});

const appContainer = createAppContainer(createSwitchNavigator(
  {
    SignedIn: {screen: SignedIn},
    SignedOut: {screen: SignedOut}
  },
  {
    initialRouteName: 'SignedOut'
  }
));

export default class Router extends Component {
  render() {
    const Route = appContainer;
    return (
      <Route/>
    );
  }
}
