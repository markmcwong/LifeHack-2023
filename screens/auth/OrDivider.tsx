import * as React from "react";

import { Divider, HStack } from "native-base";

import { StyleSheet } from "react-native";
import { Text } from "../../components/Themed";

const OrDivider = () => (
  <HStack width="75%" marginTop={3}>
    <Divider size={0.5} width="45%" marginTop={2} />
    <Text style={styles.orText}>OR</Text>
    <Divider size={0.5} width="45%" marginTop={2} />
  </HStack>
);

const styles = StyleSheet.create({
  orText: {
    color: "#b1b1b1",
    marginHorizontal: 5,
  },
});

export default OrDivider;
