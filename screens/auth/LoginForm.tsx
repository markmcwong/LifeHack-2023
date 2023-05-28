import { Button, Checkbox, HStack, Input, VStack } from "native-base";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useState } from "react";

import { Text } from "../../components/Themed";
import { login } from "../../services/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <KeyboardAvoidingView>
      <VStack space={3}>
        <Input
          padding={4}
          placeholder="Please enter your email"
          backgroundColor="#F1F1F1"
          value={email}
          onChangeText={(e: string) => setEmail(e)}
        />
        <Input
          padding={4}
          type="password"
          placeholder="Password"
          backgroundColor="#F1F1F1"
          value={password}
          onChangeText={(e: string) => setPassword(e)}
        />
        <HStack justifyContent="space-between">
          <Checkbox value="test" alignSelf="flex-start">
            <Text style={{ ...styles.link, textAlign: "left" }}>
              Remember me
            </Text>
          </Checkbox>
          <Text style={styles.link}>Forgot Password?</Text>
        </HStack>
        <Button
          style={styles.button}
          onPress={() => {
            console.log(email);
            login(email, password);
          }}
        >
          Login
        </Button>
      </VStack>
    </KeyboardAvoidingView>
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
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default LoginForm;
