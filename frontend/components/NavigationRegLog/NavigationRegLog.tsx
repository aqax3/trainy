import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';
import HomePage from '../HomePage/HomePage';

const Stack = createStackNavigator();

export default function NavigationRegLog() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Register'>
                <Stack.Screen name="Register" component={RegistrationForm} />
                <Stack.Screen name="Login" component={LoginForm} />
                <Stack.Screen name="Home" component={HomePage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}