import { Button, Checkbox, Input, VStack } from "native-base";
import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { Text } from "../../components/Themed";
import { register } from "../../services/auth";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        type="password"
        placeholder="Password"
        backgroundColor="#F1F1F1"
        value={password}
        height={10}
        onChangeText={(e: string) => setPassword(e)}
      />
      <Input
        paddingX={4}
        placeholder="User Name"
        backgroundColor="#F1F1F1"
        value={username}
        height={10}
        onChangeText={(e: string) => setUsername(e)}
      />
      <Text style={styles.passwordInfo}>
        Password should consist of at least 8 characters, including letters and
        numbers
      </Text>
      <Checkbox value="remembered" alignSelf="flex-start">
        <Text style={styles.link}>Remember me</Text>
      </Checkbox>
      <Button
        style={styles.button}
        onPress={() => register(username, email, password)}
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
});

export default SignUpForm;
