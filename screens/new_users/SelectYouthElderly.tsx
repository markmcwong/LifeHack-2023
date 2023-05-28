import * as React from "react";

import { HStack, Image, Pressable, Text, View } from "native-base";
import { connect, useSelector } from "react-redux";

import { StyleSheet } from "react-native";
import { setUserType } from "../../services/firestore";

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const SelectInterests = (props: any) => {
  const user = useSelector((state: any) => state.user);

  return (
    <View style={styles.container}>
      <Text
        p={12}
        style={{
          color: "#F9A826",
          fontWeight: "bold",
          fontFamily: "Avenir",
          fontSize: 36,
          marginBottom: "-10%",
        }}
      >
        {"I am..."}
      </Text>
      <Image
        resizeMode="contain"
        w="60%"
        h="40%"
        alt="Picture: Youth or Elderly"
        style={{ marginTop: "-15%" }}
        source={require("../../assets/images/youthOrElderly.png")}
      />
      <Pressable
        onPress={async () => {
          await setUserType(false, user.uid);
          props.navigation.navigate("selfIntroduction");
        }}
        borderColor="#08797b"
        borderWidth={3}
        rounded="xl"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          height: "10%",
          borderRadius: 30,
          marginBottom: "5%",
          marginTop: "-15%",
        }}
      >
        <HStack
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/old-woman.png")}
            alt="old-woman"
            w="25%"
            resizeMode="contain"
          />

          <Text
            style={{
              fontFamily: "Avenir",
              fontWeight: "600",
              marginLeft: "10%",
            }}
          >
            Elderly
          </Text>
        </HStack>
      </Pressable>
      <Pressable
        onPress={async () => {
          await setUserType(true, user.uid);
          props.navigation.navigate("selfIntroduction");
        }}
        borderColor="#F5A623"
        borderWidth={3}
        rounded="xl"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          height: "10%",
          borderRadius: 30,
        }}
      >
        <HStack
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/teenage.png")}
            alt="teenage"
            w="25%"
            resizeMode="contain"
          />

          <Text
            style={{
              fontFamily: "Avenir",
              fontWeight: "600",
              marginLeft: "10%",
            }}
          >
            Youth
          </Text>
        </HStack>
      </Pressable>
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
    overflow: "scroll",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});
