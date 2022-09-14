import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import CurrencyExchangeRate from '../screens/currencyExchangeRate';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={{ title: 'Home' }} />
      <Stack.Screen
        name="currencyExchangeRate"
        component={CurrencyExchangeRate}
        options={{ title: 'Currency Exchange Rate' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
