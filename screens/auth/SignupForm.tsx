import { Button, Checkbox, Input, VStack } from "native-base";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useState } from "react";

import { Text } from "../../components/Themed";
import { register } from "../../services/auth";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isUsernameValid = username.length >= 8;

  return (
    <VStack space={4}>
      <Input
        paddingX={4}
        placeholder="Please enter your email"
        backgroundColor="#F1F1F1"
        value={email}
        height={10}
        onChangeText={(e: string) => setEmail(e)}
      />
      <Input
        paddingX={4}
        placeholder="User Name"
        backgroundColor="#F1F1F1"
        value={username}
        height={10}
        onChangeText={(e: string) => setUsername(e)}
      />
      <Input
        paddingX={4}
        type="password"
        placeholder="Password"
        backgroundColor="#F1F1F1"
        value={password}
        height={10}
        onChangeText={(e: string) => setPassword(e)}
      />
      {/* {username.length > 0 && !isUsernameValid && (
        <Text style={styles.errorText}>
          Username should consist of at least 8 characters
        </Text>
      )} */}
      <Text style={styles.passwordInfo}>
        Username should be at least 6 characters long. Password should consist of at least 8 characters, including letters and
        numbers. 
      </Text>
      <Checkbox value="remembered" alignSelf="flex-start">
        <Text style={styles.link}>Remember me</Text>
      </Checkbox>
      <Button
        style={styles.button}
        onPress={() => register(username, email, password)}
        isDisabled={!isUsernameValid}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

const styles = StyleSheet.create({
  passwordInfo: {
    color: "#b1b1b1",
    textAlign: "left",
    fontSize: 11,
  },
  link: {
    color: "#b1b1b1",
    textAlign: "center",
    marginTop: 1,
  },
  button: {
    backgroundColor: "#F9A826",
    // width: "100%",
    // textAlign: "left",
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 11,
  },
});

export default SignUpForm;
