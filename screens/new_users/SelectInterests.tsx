import { Button, Fab, HStack, Icon, Text, VStack, View } from "native-base";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { setUserInterests } from "../../services/firestore";
import store from "../../state/store";

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const options = [
  "Classical Music",
  "Basketball",
  "Football",
  "Martial Arts",
  "Gaming",
  "Mahjong",
  "Origami",
  "Deserts",
  "Tai Chi",
  "Photography",
  "Reading",
  "Cooking",
  "Dancing",
  "Drawing",
  "Writing",
];

const SelectInterests = (props: any) => {
  const [active, setActive] = useState<String[]>([]);
  const user = useSelector((state: any) => state.user);

  const handleInterestSelection = (option: string) => {
    if (active.includes(option)) {
      setActive(active.filter((x) => x !== option));
    } else {
      if (active.length < 3) {
        setActive([...active, option]);
      } else {
        alert("You can only choose up to 3 interests!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <VStack h="100%" w="100%" justifyContent="center" alignItems="center">
        <Text
          p={12}
          style={{
            color: "#F9A826",
            fontWeight: "bold",
            fontFamily: "Avenir",
            fontSize: 36,
          }}
        >
          Your interests!
          <Text
            style={{
              color: "#7d7d7d",
              fontWeight: "300",
              fontFamily: "Avenir",
              fontSize: 18,
            }}
          >
            Select 1-3 interest to find elderlies who have the same interest as
            you!
          </Text>
        </Text>
        <HStack
          flexWrap="wrap"
          p={12}
          style={{ marginLeft: "3%", marginTop: "-10%" }}
        >
          {options.map((option, index) => (
            <Button
              key={index}
              marginRight={3}
              marginBottom={3}
              borderRadius={20}
              backgroundColor={active.includes(option) ? "#F5A623" : "#fff"}
              borderColor={active.includes(option) ? "#F5A623" : "#172D55"}
              borderWidth={1}
              _text={{
                color: active.includes(option) ? "#FFF" : "#000",
              }}
              onPress={() => handleInterestSelection(option)}
            >
              {option}
            </Button>
          ))}
        </HStack>
        <Fab
          position="absolute"
          size="sm"
          backgroundColor="orange"
          bottom={10}
          right={10}
          onPress={() => {
            if (active.length === 0) {
              alert("You have to choose at least one interest");
            } else {
              setUserInterests(active, user.uid);
              store.dispatch({ type: "FINISH_ONBOARD" });
            }
          }}
          icon={
            <Icon
              size="lg"
              color="black"
              as={Ionicons}
              name="arrow-forward-outline"
            />
          }
        />
      </VStack>
    </View>
  );
};

export default connect(mapStateToProps)(SelectInterests);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
