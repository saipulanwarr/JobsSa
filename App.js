import React, {Component} from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";

import { Provider } from 'react-redux';
import store from './src/publics/redux/store';
import SplashPage from './src/screens/SplashPage';
import LandingPage from './src/screens/LandingPage';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import HomePage from './src/screens/HomePage';
import SideBar from './src/components/SideBar';
import ProfilePage from './src/screens/ProfilePage';
import JobDetailPage from './src/screens/JobDetailPage';
import ActivePage from './src/screens/ActivePage';
import PastPage from './src/screens/PastPage';
import MyJobsPage from './src/screens/MyJobsPage';
import ApplicantPage from './src/screens/ApplicantPage';

import Contact from './src/components/Contact';
import Education from './src/components/Education';
import Experience from './src/components/Experience';
import PersonUser from './src/screens/PersonUser';
import SearchPage from './src/screens/SearchPage';
import FavoritePage from './src/screens/FavoritePage';

const MyAppPage = createMaterialBottomTabNavigator({
  ACTIVE: {
    screen: ActivePage,
    navigationOptions: {
      tabBarIcon:({tintColor}) => (
        <Icon name="ios-checkmark-circle-outline" size={25} color={tintColor} />
      )
    }
  },
  PAST: {
    screen: PastPage,
    navigationOptions: {
      tabBarIcon:({tintColor}) => (
        <Icon name="ios-close-circle-outline" size={25} color={tintColor} />
      )
    }
  }
},
{
  initialRouteName: 'ACTIVE',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#1C3F94' },
})

const AuthPage = createStackNavigator({
  SplashPage: {
    screen: SplashPage,
    navigationOptions: {
      header: null
    }
  },
  LandingPage: {
    screen:LandingPage,
    navigationOptions:{
      header: null
    }
  },
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  RegisterPage: {
    screen: RegisterPage,
    navigationOptions: {
      header: null
    }
  },
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  ProfilePage: {
    screen: ProfilePage,
    navigationOptions: {
      header: null
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      header: null
    }
  },
  Education: {
    screen: Education,
    navigationOptions: {
      header: null
    }
  },
  Experience: {
    screen: Experience,
    navigationOptions: {
      header: null
    }
  },
  JobDetailPage: {
    screen: JobDetailPage,
    navigationOptions: {
      header: null
    }
  },
  MyApplicationPage: {
    screen: MyAppPage,
    navigationOptions: {
      header: null
    }
  },
  MyJobsPage: {
    screen: MyJobsPage,
    navigationOptions: {
      header: null
    }
  },
  ApplicantPage: {
    screen: ApplicantPage,
    navigationOptions: {
      header: null
    }
  },
  PersonUserPage: {
    screen: PersonUser,
    navigationOptions: {
      header: null
    }
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      header: null
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      header: null
    }
  }
})

const PageDrawer = createDrawerNavigator({
  PageDrawerSc: { screen: AuthPage },
},
{
  contentComponent: props => <SideBar {...props} />
})

const switchNavigator = createSwitchNavigator({
  PageDrawer
});

const AppRoot = createAppContainer(switchNavigator);

export default class Root extends Component{
  render(){
    return(
      <Provider store={store}>
        <AppRoot />
      </Provider>
    )
  }
}