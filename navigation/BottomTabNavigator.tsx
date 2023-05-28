/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from "react";

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { HStack, Icon, Image, VStack } from "native-base";
import { Text, View } from "../components/Themed";

import Achievement from "../screens/achievement";
import ChatBox from "../screens/chatBox";
import { ChatListScreen } from "../screens/ChatListScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import PersonDetailScreen from "../screens/PersonDetail";
import ProfileScreen from "../screens/ProfileScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import selectFamiliarLang from "../screens/selectFamiliarLang";
import selectInterests from "../screens/selectInterests";
import selectStartingLanguage from "../screens/selectStartingLang";
import selectYouthElderly from "../screens/selectYouthElderly";
import selfIntroduction from "../screens/selfIntroduction";
import { useSelector } from "react-redux";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const user = useSelector((state: any) => state.user);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <MyTabBar {...props} />}
      tabBarOptions={{
        activeTintColor: user.isYouth ? "#ff9f00" : "#78C9A7",
        // "#EFB556",
        inactiveTintColor: "#c2c2c2",
        safeAreaInsets: { bottom: 10 },

        labelStyle: {
          display: "none",
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          // style: { backgroundColor: "#ffffff" },
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbubbles-outline" color={color} />
          ),
        }}
      />
      {user.isYouth && (
        <BottomTab.Screen
          name="Achievement"
          component={Achievement}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="trophy-outline" color={color} />
            ),
          }}
        />
      )}
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  const user = useSelector((state: any) => state.user);
  return (
    // state.index == 1 ? (
    //   <></>
    // ) :
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#ffffff",
        // height: 50,

        padding: 15,
        borderRadius: 25,
        // justifyContent: "center",
        // alignItems: "center",
        marginHorizontal: 30,
        overflow: "hidden",
        position: "absolute",
        bottom: 20,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Icon
              color={
                isFocused ? (user.isYouth ? "#ff9f00" : "#78C9A7") : "#c2c2c2"
              }
              as={options.tabBarIcon}
            ></Icon>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  const user = useSelector((state: any) => state.user);
  return (
    <TabOneStack.Navigator
      screenOptions={{
        headerTitle: () => <Text></Text>,
        headerStyle: {
          backgroundColor: user.isYouth ? "#ff9f00" : "#78C9A7",
          height: 30,
          shadowOffset: { height: 0 },
        },
      }}
    >
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: () => <Text></Text>,
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator initialRouteName="ChatList">
      <TabTwoStack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          header: () => null,
          headerTitle: () => <Text></Text>,
        }}
      />
    </TabTwoStack.Navigator>
  );
}
