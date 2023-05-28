import { Center, Fab, Icon, Text, TextArea, View } from "native-base";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { setUserBio } from "../../services/firestore";

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const SelfIntroduction = (props: any) => {
  const user = useSelector((state: any) => state.user);
  const [bio, setBio] = useState("");

  const handleBioChange = (text: string) => {
    setBio(text);
  };

  const handleSubmit = () => {
    setUserBio(
      JSON.stringify(bio).substring(1, JSON.stringify(bio).length - 1),
      user.uid
    );
    props.navigation.navigate("selectStartingLang");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.contentContainer}
        >
          <Center flex={1}>
            <Text
              color="#F9A826"
              fontWeight="bold"
              fontFamily="Avenir"
              fontSize={36}
              textAlign="center"
              paddingY={5}
            >
              Tell Us More{"\n"}About You!
            </Text>
            <TextArea
              borderColor="orange"
              color="orange"
              width="80%"
              numberOfLines={8} // Adjust the number of lines to increase the height
              borderRadius={20}
              placeholder="Your short self introduction!"
              value={bio}
              onChangeText={handleBioChange}
              autoCompleteType="off"
              // size="vertical" // Added resize prop to allow vertical resizing
            />
            <Fab
              position="absolute"
              size="sm"
              backgroundColor="orange"
              bottom={10}
              right={10}
              onPress={handleSubmit}
              icon={
                <Icon
                  size="lg"
                  color="black"
                  as={Ionicons}
                  name="arrow-forward-outline"
                />
              }
            />
          </Center>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default connect(mapStateToProps)(SelfIntroduction);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    width: "80%",
  },
});
