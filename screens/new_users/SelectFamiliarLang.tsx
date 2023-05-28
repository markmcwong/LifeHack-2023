import { Button, Fab, HStack, Icon, Text, VStack, View } from "native-base";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";
import { StyleSheet } from "react-native";
import { setUserFamiliarLang } from "../../services/firestore";

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const options = [
  "Cantonese",
  "Mandarin",
  "Spanish",
  "English",
  "Korean",
  "Arabic",
  "Others",
];

const SelectFamiliarLang = (props: any) => {
  const [active, setActive] = useState<String[]>([]);
  const user = useSelector((state: any) => state.user);

  const handleLanguageSelection = (option: string) => {
    const newActive = active.includes(option)
      ? active.filter((lang) => lang !== option)
      : [...active, option];
    setActive(newActive);
  };

  return (
    <View style={styles.container}>
      <VStack h="100%" w="100%" justifyContent="center" alignItems="center">
        {/* <VStack> */}
        <Text
          paddingX={12}
          color="#F9A826"
          fontWeight="bold"
          fontFamily="Avenir"
          fontSize={36}
        >
          Language that {"\n"}I'm Familiar with
        </Text>
        <Text
          color="#7d7d7d"
          fontWeight="300"
          fontFamily="Avenir"
          fontSize={18}
          textAlign="left"
          paddingX={12}
          pb={5}
        >
          Not including mother tongue
        </Text>
        {/* </VStack> */}
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
              onPress={() => handleLanguageSelection(option)}
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
            setUserFamiliarLang(active, user.uid);
            props.navigation.navigate("selectInterests");
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

export default connect(mapStateToProps)(SelectFamiliarLang);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
