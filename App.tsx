import "react-native-gesture-handler";

import * as React from "react";

import { NativeBaseProvider } from "native-base";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase/compat/app";
import { getUserRecord } from "./services/firestore";
import store from "./state/store";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";

// import { useNavigation } from "@react-navigation/native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      console.log("We are authenticated now!");
      getUserRecord(user?.uid).then((x) =>
        store.dispatch({
          type: "LOGIN",
          name: user?.displayName,
          uid: user?.uid,
        })
      );
      // useNavigation().navigate("Auth");
    } else {
      store.dispatch({
        type: "LOGOUT",
      });
    }
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
