import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import { Platform, SafeAreaView } from 'react-native'
import COLORS from '../common/Colors'

import MainPage from '../pages/MainPage'

const safeViewIos = (
  <>
    <SafeAreaView style={{ backgroundColor: COLORS["profile-table"] }} forceInset={{ bottom: 'always', top: 'never' }} />
    {/* copy the header from playersapp */}
  </>
);

const safeViewAndroid = (
  <>
    <SafeAreaView style={{ backgroundColor: COLORS["profile-table"] }} />
  </>
);

export const DrawerNavigation = createDrawerNavigator({
  "MainPage": MainPage
}
);

export const RootStack = createStackNavigator(
  {
    "RootStack": {
      screen: DrawerNavigation,
      navigationOptions: {
        header: ({ navigation }) => {
          return Platform.OS === 'ios' ? safeViewIos : safeViewAndroid
        }
      },
    }
  }
);


const Stack = createAppContainer(RootStack);

export default Stack