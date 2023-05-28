import * as React from "react";

import { Divider, HStack, VStack } from "native-base";
import {
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import GoogleLoginButton from "./GoogleLoginButton";
import OrDivider from "./OrDivider";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpForm from "./SignupForm";
import { Text } from "../../components/Themed";

const WelcomeText = () => (
  <>
    <Text style={styles.title}>Welcome</Text>
    <Text style={styles.subtitle}>Sign up now to start using</Text>
  </>
);

const LogoImage = () => (
  <Image
    resizeMode="cover"
    style={styles.logoImage}
    source={require("../../assets/images/Signup.png")}
    alt="signup"
    marginVertical={10}
  />
);

const SignInLink = ({ navigation }) => (
  <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
    Have an account? Sign in Here
  </Text>
);

export default function LandingScreen({ navigation }) {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* <View style={styles.container}> */}
          <VStack style={{ flex: 1 }} width="75%">
            <WelcomeText />
            <LogoImage />
            <SignUpForm />
          </VStack>

          <VStack paddingBottom={2}>
            <SignInLink navigation={navigation} />
            <OrDivider />
            <GoogleLoginButton />
          </VStack>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      <ImageBackground
        source={require("../../assets/images/landing_background.png")}
        resizeMode="cover"
        style={styles.image}
      />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginTop: "15%",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  carouselTitle: {
    fontSize: 14,
    color: "#FFF",
    marginTop: "5%",
    textAlign: "center",
  },
  passwordInfo: {
    color: "#b1b1b1",
    textAlign: "left",
    fontSize: 11,
  },
  logoImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  link: {
    color: "#b1b1b1",
    textAlign: "center",
    marginTop: 1,
  },
  orText: {
    color: "#b1b1b1",
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#F9A826",
    // width: "100%",
    // textAlign: "left",
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
