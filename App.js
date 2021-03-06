import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import { AppNavigation } from './src/navigation/AppNavigation'
import AppLoading from 'expo-app-loading';
import { bootstrap } from './src/bootstrap'
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <View>
        <AppLoading
          startAsync={bootstrap}
          onFinish={() => setIsReady(true)}
          onError={(err) => console.log(err)}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}
