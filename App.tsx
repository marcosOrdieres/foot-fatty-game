import React, { useEffect } from 'react';
import AppNavigator from './src/config/router';
import { setAsyncStorage, getAsyncStorage } from './src/services/storage-service';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Bathroom from './src/pages/BathroomPage'
import Bedroom from './src/pages/BedroomPage'

const Stack = createStackNavigator();

const App = () => {
  const landscapeMode = async () => {
    const amountCoins = await getAsyncStorage('coins');
    if (!amountCoins) {
      await setAsyncStorage('coins', 0);
    }
  }
  landscapeMode()
  useEffect(() => {
    landscapeMode();
  }, []);

  return (
    <>
      <StatusBar hidden />
      {/* <AppNavigator /> */}

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Bathroom" component={Bathroom} />
          <Stack.Screen options={{ headerShown: false }} name="Bedroom" component={Bedroom} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
};

export default App