import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation";
import Home from './screens/Home';
import Login from './screens/Login';
import Account from './screens/Account';
import Map from './screens/Map'
import Camera from './screens/Camera';
import CompleteCamera from './screens/CompleteCamera';
import CreatePost from './screens/CreatePost';
import CompletePost from './screens/CompletePost';
import Progress from './screens/Progress'
import Post from './screens/Post';
import HideDrawerLabel from './components/HideDrawerLabel';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeStack = createStackNavigator(
  {
    Home,
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

const CreatePostStack = createStackNavigator(
  {
    CreatePost
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

const CompletePostStack = createStackNavigator(
  {
    CompletePost
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

const MapStack = createStackNavigator(
  {
    Map
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

const PostStack = createStackNavigator(
  {
    Post
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

const CameraStack = createStackNavigator(
  {
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

const CompleteCameraStack = createStackNavigator(
  {
    CompleteCamera
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

const ProgressStack = createStackNavigator(
  {
    Progress
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

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeStack,
    Progress: ProgressStack,
    CreatePost: {
      screen: CreatePostStack,
      navigationOptions: {
        drawerLabel: <HideDrawerLabel />
      }
    },
    CompletePost: {
      screen: CompletePostStack,
      navigationOptions: {
        drawerLabel: <HideDrawerLabel />
      }
    },
    Post: {
      screen: PostStack,
      navigationOptions: {
        drawerLabel: <HideDrawerLabel />
      }
    },
    Map: MapStack,
    Camera: {
      screen: CameraStack,
      navigationOptions: {
        drawerLabel: <HideDrawerLabel />
      }
    },
    CompleteCamera: {
      screen: CompleteCameraStack,
      navigationOptions: {
        drawerLabel: <HideDrawerLabel />
      }
    },
    Account: AccountStack
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
