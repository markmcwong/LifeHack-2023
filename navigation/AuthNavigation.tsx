import * as React from "react";

import LandingScreen from "../screens/auth/LandingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import { createStackNavigator } from "@react-navigation/stack";

const OnboardingNavigator = createStackNavigator();

const OnboardingStack = () => (
  <OnboardingNavigator.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Landing"
  >
    <OnboardingNavigator.Screen name="Landing" component={LandingScreen} />
    <OnboardingNavigator.Screen name="Login" component={LoginScreen} />
    <OnboardingNavigator.Screen name="Signup" component={SignupScreen} />
  </OnboardingNavigator.Navigator>
);

export default OnboardingStack;
