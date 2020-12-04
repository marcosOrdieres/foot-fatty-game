import React, { useEffect } from 'react';
import AppNavigator from './src/config/router';
import { setAsyncStorage, getAsyncStorage } from './src/services/storage-service';
import { StatusBar } from 'react-native';


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
      <AppNavigator />
    </>
  )
};

export default App