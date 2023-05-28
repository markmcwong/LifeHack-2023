import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import selectFamiliarLang from "../screens/new_users/SelectFamiliarLang";
import selectInterests from "../screens/new_users/SelectInterests";
import selectStartingLang from "../screens/new_users/SelectStartingLang";
import selectYouthElderly from "../screens/new_users/SelectYouthElderly";
import selfIntroduction from "../screens/new_users/SelfIntroduction";

const NewUserNavigator = createStackNavigator();

const NewUserStack = () => (
  <NewUserNavigator.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="selectYouthElderly"
  >
    <NewUserNavigator.Screen
      name="selectYouthElderly"
      component={selectYouthElderly}
    />
    <NewUserNavigator.Screen
      name="selfIntroduction"
      component={selfIntroduction}
    />
    <NewUserNavigator.Screen
      name="selectStartingLang"
      component={selectStartingLang}
    />
    <NewUserNavigator.Screen
      name="selectFamiliarLang"
      component={selectFamiliarLang}
    />
    <NewUserNavigator.Screen
      name="selectInterests"
      component={selectInterests}
    />
  </NewUserNavigator.Navigator>
);

export default NewUserStack;
