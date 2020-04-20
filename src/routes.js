import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Search from './pages/Search';
import Details from './pages/Details';
import About from './pages/About';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Main,
        navigationOptions: {
          headerShown: false,
        },
      },
      Search: {
        screen: Search,
        navigationOptions: {
          title: 'Casos por estado',
          headerStyle: {
            backgroundColor: '#C04848',
            shadowColor: 'transparent',
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
            elevation: 0,
          },
        },
      },
      Details: {
        screen: Details,
        navigationOptions: {
          title: 'Coronavírus Brasil',
          headerStyle: {
            backgroundColor: '#C04848',
          },
          headerTintColor: '#FFF',
        },
      },
      About: {
        screen: About,
        navigationOptions: {
          title: 'Sobre',
          headerStyle: {
            backgroundColor: '#C04848',
            shadowColor: 'transparent',
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
            elevation: 0,
          },
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#2D3047',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
