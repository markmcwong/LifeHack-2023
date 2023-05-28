import { Button, Checkbox, HStack, Input, VStack } from "native-base";
import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { Text } from "../../components/Themed";
import { login } from "../../services/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    // Call the login function
    login(email, password);
  };

  return (
    <VStack space={3}>
      {error && <Text style={styles.error}>{error}</Text>}
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
          <Text style={{ ...styles.link, textAlign: "left" }}>Remember me</Text>
        </Checkbox>
        <Text style={styles.link}>Forgot Password?</Text>
      </HStack>
      <Button style={styles.button} onPress={handleLogin}>
        Login
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
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default LoginForm;
