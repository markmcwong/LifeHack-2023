import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Button, Icon } from "native-base";
import React, { useEffect, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNewUserRecord } from "../../services/firestore";
import firebase from "firebase/compat/app";
import store from "../../state/store";

WebBrowser.maybeCompleteAuthSession();

const GoogleLoginButton = () => {
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    iosClientId:
      "507065659669-bkdja09me5njvtsf88mr4frid8jnu42h.apps.googleusercontent.com",
    expoClientId:
      "507065659669-gkn8h09c1fe9hgvmom8t2n6sulr82ev9.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication!.accessToken);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        response.authentication?.idToken,
        response.authentication?.accessToken
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          var user = result.user;
          if (result.additionalUserInfo?.isNewUser) {
            createNewUserRecord(
              user?.displayName!,
              user?.email!,
              result.user!.uid
            );
          }
          store.dispatch({
            type: "LOGIN",
            name: user?.displayName,
            uid: user?.uid,
            isNewUser: result.additionalUserInfo?.isNewUser ?? false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [response, token]);

  return (
    <Button
      borderColor="#b9b9b9"
      variant="outline"
      marginTop={2}
      onPress={() => promptAsync()}
      startIcon={<Icon as={MaterialCommunityIcons} name="google" size={5} />}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
