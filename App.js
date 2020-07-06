import React from 'react';
import { Provider } from 'react-redux';

import AppStore from './src/redux/Store';
import AppNavigator from './src/navigations';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Provider store={AppStore}>
      <AppNavigator />
    </Provider>
  );
}
