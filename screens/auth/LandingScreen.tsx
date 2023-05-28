import * as React from "react";

import { Button, Divider, HStack, Icon, Image } from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";

import GoogleLoginButton from "./GoogleLoginButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
// import carouselData from "../mock_data/LandingCarouselData.json"; // Update the path accordingly
import { loginWithGoogle } from "../../services/auth";
import { useState } from "react";

export default function LandingScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = {
    carouselItems: [
      {
        title:
          "Connect with elderlies and youth locally & globally. Discover Chat & Engage",
        image: require("../../assets/images/1.png"),
      },
      {
        title:
          "Explore new things through our app.\nDiscover & understand other culture",
        image: require("../../assets/images/2.png"),
      },
      {
        title: "Share your moments. Make your every day fun & enjoyable.",
        image: require("../../assets/images/3.png"),
      },
    ],
  };

  const _renderItem = ({ item, index }) => {
    const imageSource = item.image; // Get the image path from the JSON data

    return (
      <View style={{ height: 300, backgroundColor: "transparent" }}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Image
          resizeMode="contain"
          style={styles.carouselImage}
          alt={index.toString()}
          source={imageSource} // Use the image path directly
        />
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={carouselData.carouselItems.length}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(0, 0, 0, 0.69)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Carousel
          renderItem={_renderItem}
          data={carouselData.carouselItems}
          sliderWidth={275}
          itemWidth={275}
          layout={"default"}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        {pagination()}
        <Text
          style={{ ...styles.link, marginTop: "5%" }}
          onPress={() => navigation.navigate("Login")}
        >
          Have an account? Sign in Here
        </Text>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          Continue with Email
        </Button>
        <HStack width="75%" marginTop={7}>
          <Divider size={0.5} width="45%" marginTop={3} />
          <Text style={styles.link}>OR</Text>
          <Divider size={0.5} width="45%" marginTop={3} />
        </HStack>
        <GoogleLoginButton />
      </SafeAreaView>
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
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    // aspectRatio: 1,
    position: "absolute",
    zIndex: -1,
  },
  container: {
    // flex: 1,
    // justifyContent: "space-between",
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
  carouselTitle: {
    fontSize: 14,
    color: "#FFF",
    marginTop: "5%",
    textAlign: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  link: {
    fontSize: 14,
    color: "#b1b1b1",
    // marginTop: "5%",
    textAlign: "center",
    margin: 5,
  },
  button: {
    backgroundColor: "#F9A826",
    width: "75%",
    borderRadius: 7.5,
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

// export default LandingScreen;
