import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Home from './Screens/Home';
import ApplicationForm from './Screens/ApplicationForm';
import { GlobalProvider, useGlobalContext } from './context/globalContext'; 

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { isDarkMode } = useGlobalContext(); 

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: isDarkMode ? '#121212' : '#F5FCFF' },
          headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: "Job Finder" }} />
        <Stack.Screen name="ApplicationForm" component={ApplicationForm} options={{ title: "Apply" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GlobalProvider> 
      <MainNavigator />
    </GlobalProvider>
  );
}
