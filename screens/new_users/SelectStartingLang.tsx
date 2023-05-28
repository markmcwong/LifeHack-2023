import { Center, Fab, Icon, Select, Text, View } from "native-base";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";
import { StyleSheet } from "react-native";
import { setUserMotherTongue } from "../../services/firestore";

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

const SelectStartingLanguage = (props: any) => {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const user = useSelector((state: any) => state.user);

  const handleLanguageChange = (itemValue: string) => {
    setSelectedItems([itemValue]);
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        items={options.map((option) => ({ id: option, name: option }))}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedItems}
        selectedItems={selectedItems}
      />
      <Center flex={1}>
        <Text
          color="#F9A826"
          fontWeight="bold"
          fontFamily="Avenir"
          fontSize={30}
          textAlign="center"
          paddingY={5}
        >
          My Mother Tongue
        </Text>
        <Select
          selectedValue={selectedItems[0]}
          minWidth={200}
          accessibilityLabel="Select your mother tongue"
          placeholder="Select your mother tongue"
          onValueChange={handleLanguageChange}
          _selectedItem={{
            bg: "orange.200",
            endIcon: <Icon as={Ionicons} name="checkmark" size={4} />,
          }}
        >
          {options.map((option) => (
            <Select.Item key={option} label={option} value={option} />
          ))}
        </Select>
        <Fab
          position="absolute"
          size="sm"
          backgroundColor="orange"
          bottom={10}
          right={10}
          onPress={() => {
            setUserMotherTongue(selectedItems[0], user.uid);
            props.navigation.navigate("selectFamiliarLang");
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
      </Center>
    </View>
  );
};

export default connect(mapStateToProps)(SelectStartingLanguage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
