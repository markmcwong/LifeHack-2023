import * as React from "react";

import {
  Button,
  Center,
  Checkbox,
  Divider,
  HStack,
  Icon,
  Input,
  VStack,
} from "native-base";
import {
  CheckBox,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { login, loginWithGoogle } from "../../services/auth";

import GoogleLoginButton from "./GoogleLoginButton";
import LoginForm from "./LoginForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OrDivider from "./OrDivider";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpForm from "./SignupForm";
import { useState } from "react";

const TitleText = () => (
  <>
    <Text style={styles.title}>Login</Text>
    <Text style={styles.subtitle}>To continue your access</Text>
  </>
);

const LogoImage = () => (
  <Image
    resizeMode="contain"
    style={styles.logoImage}
    source={require("../../assets/images/Login.png")}
    margin={8}
    alt="login"
  />
);

const CreateAccountLink = ({ navigation }) => (
  <Text
    style={{ ...styles.link, marginTop: "5%" }}
    onPress={() => navigation.navigate("Signup")}
  >
    Don’t have an account? Create here
  </Text>
);

export default function LoginScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 300, backgroundColor: "transparent" }}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        {item.image}
      </View>
    );
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <TitleText />
          <LogoImage />
          <VStack style={{ flex: 1 }} width="75%">
            <LoginForm />
          </VStack>
          <VStack paddingBottom={5}>
            <CreateAccountLink navigation={navigation} />
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
    // resizeMode: "contain",
    // flex: 1,
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    // aspectRatio: 1,
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
  logoImage: {
    width: 300,
    height: 150,
    alignSelf: "center",
  },
  link: {
    fontSize: 14,
    color: "#868686",
    textAlign: "center",
    margin: 5,
  },
  button: {
    backgroundColor: "#F9A826",
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
});
