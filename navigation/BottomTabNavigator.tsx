import * as React from "react";

import { HStack, Icon, Image, VStack } from "native-base";
import { Text, View } from "../components/Themed";

import Achievement from "../screens/achievement";
import { BottomTabParamList } from "../types";
import { ChatListScreen } from "../screens/chat/ChatListScreen";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import TabOneScreen from "../screens/TabOneScreen";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator<BottomTabParamList>();
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function BottomTabNavigator() {
  const user = useSelector((state: any) => state.user);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#78C9A7",
        tabBarInactiveTintColor: "#c2c2c2",
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbubbles-outline" color={color} />
          ),
        }}
      />
      {user.isYouth && (
        <Tab.Screen
          name="Achievement"
          component={Achievement}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="trophy-outline" color={color} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle-outline" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  const user = useSelector((state: any) => state.user);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 25,
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
            key={index}
            style={{ flex: 1, alignItems: "center" }}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon
              as={options.tabBarIcon}
              color={
                isFocused ? (user.isYouth ? "#ff9f00" : "#78C9A7") : "#c2c2c2"
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  const user = useSelector((state: any) => state.user);

  return (
    <TabOneStack.Navigator
      screenOptions={{
        headerTitle: () => <Text></Text>,
        headerStyle: {
          backgroundColor: user.isYouth ? "#ff9f00" : "#78C9A7",
          height: 40,
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

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator initialRouteName="ChatList">
      <TabTwoStack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          headerShown: false,
          headerTitle: () => <Text></Text>,
        }}
      />
    </TabTwoStack.Navigator>
  );
}
