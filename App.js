import React, { Component } from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// import redux store
import reduxStore from './store';

// import components
import Login from './components/auth/Login';
import AutoLogin from './components/auth/AutoLogin';
import ReduxReload from './components/auth/ReduxReload';
import SignUp from './components/auth/SignUp';
import Home from './components/Home';
import Settings from './components/Settings';
import UserInfo from './components/UserInfo';
import NewPost from './components/NewPost';

// import styles
import { appColor, appComplementColor, appBarColor } from './styles';

// login/signin scenes navigation setup
const loginNav = createStackNavigator(
  {
    Login,
    SignUp
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null
    }
  }
);

// home screen navigation setup
const homeAndPostNav = createStackNavigator(
  {
    Home,
    NewPost
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null
    }
  }
);

// home navigation setup
const homeNav = createMaterialTopTabNavigator(
  {
    Home: {
      screen: homeAndPostNav,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='home' size={20} color={appComplementColor} />
        )
      }
    },
    UserInfo: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLabel: 'User Info',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='user' size={20} color={appComplementColor} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='cog' size={20} color={appComplementColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      style: {
        backgroundColor: appColor
      },
      showIcon: true,
      showLabel: false
    },
    tabBarPosition: 'bottom'
  }
);

// authentication scenes navigation setup
const authNav = createSwitchNavigator(
  {
    AutoLogin,
    loginNav,
    homeNav
  },
  {
    initialRouteName: 'AutoLogin'
  }
);

const AppNav = createAppContainer(authNav);

class App extends Component {
  render() {
    return (
      <Provider store={reduxStore.store}>
        <PersistGate loading={<ReduxReload />} persistor={reduxStore.persistor}>
          <AppNav />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
