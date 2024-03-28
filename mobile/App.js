import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigators';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}