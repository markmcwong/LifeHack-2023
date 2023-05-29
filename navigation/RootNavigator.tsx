import * as React from "react";

import BottomTabNavigator from "./BottomTabNavigator";
import NewUserStack from "./newUserNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";
import OnboardingStack from "./AuthNavigation";
import PersonDetail from "../screens/PersonDetail";
import { RootStackParamList } from "../types";
import chatBox from "../screens/chat/ChatBox";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<RootStackParamList>();

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const RootNavigator = (props: any) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {props.user.uid == null ? (
        // No token found, user isn't signed in
        <Stack.Screen name="NoAuth" component={OnboardingStack} />
      ) : props.user.isNewUser ? (
        // User is signed in, but new user
        <Stack.Screen name="NewUser" component={NewUserStack} />
      ) : (
        // User is signed in and not a new user
        <>
          <Stack.Screen name="Auth" component={BottomTabNavigator} />
          <Stack.Screen
            name="PersonDetailScreen"
            component={PersonDetail}
            options={{
              headerShown: false,
              headerTitle: null,
            }}
          />
          <Stack.Screen
            name="Conversation"
            component={chatBox}
            options={{
              headerShown: false,
              headerTitle: null,
            }}
          />
        </>
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps)(RootNavigator);
