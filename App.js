import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator} from "react-navigation";
import Home from './screens/Home';
import Login from './screens/Login';
import Account from './screens/Account';
import Camera from './screens/Camera';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeStack = createStackNavigator(
  {
    Home,
    Camera
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: 'white'
        },
        headerLeft:
          <Icon
            name="bars"
            size={30}
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()} />,
        headerRight:
          <Avatar
            rounded
            containerStyle={{ marginRight: 10 }}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/939549969958051840/zs3ndSvV_400x400.jpg',
            }}
          />
      };
    }
  }
)

const AccountStack = createStackNavigator(
  {
    Account,
    Camera
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft:
        <Icon
          name="bars"
          size={30}
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.openDrawer()} />,
        headerRight:
          <Avatar
            rounded
            containerStyle={{ marginRight: 10 }}
            source={{
              uri:
              'https://pbs.twimg.com/profile_images/939549969958051840/zs3ndSvV_400x400.jpg',
            }}
          />
      };
    }
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeStack,
    Account: AccountStack,
  },
  {
    contentOptions: {
      inactiveTintColor: 'black',
      activeTintColor: 'rgb(0, 119, 190)'
    }
  }
)

DrawerNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle,
  };
};

const SwitchNavigator = createSwitchNavigator(
  {
    Login,
    Home: {
      screen: DrawerNavigator
    },
  },
  {
    initialRouteName: "Login"
  },
);

export default createAppContainer(SwitchNavigator);
