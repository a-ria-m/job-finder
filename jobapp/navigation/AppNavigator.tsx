import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';
import SavedJobs from '../Screens/SavedJobs';
import ApplicationForm from '../Screens/ApplicationForm';
import { RootStackParamList } from './props';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SavedJobs" component={SavedJobs} />
        <Stack.Screen name="ApplicationForm" component={ApplicationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
