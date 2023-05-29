import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  MessageText,
  Send,
} from "react-native-gifted-chat";
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Popover,
  Text,
  VStack,
  View,
} from "native-base";
import { Configuration, OpenAIApi } from "openai";
import React, { useCallback, useEffect, useState } from "react";
import {
  fetchMessagesByGroupId,
  sendNewMessage,
} from "../../services/firestore";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OPENAI_KEY } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { useLayoutEffect } from "react";

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const ChatBox = ({ route, user, navigation }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const configuration = new Configuration({
    apiKey: OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    fetchMessagesByGroupId(route.params.id, (val: any) =>
      setMessages(
        val.map((x) => ({
          ...x,
          user: {
            _id: x.user._id,
            name: user.uid === x.user._id ? user.name : route.params.name,
          },
          warning: x.warning,
          warningText: x.warningText,
        }))
      )
    );
    // console.log(messages);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const language = "English";
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a Professional ${language} Language Course Teacher teaching me, a teenager student.`,
          },
          {
            role: "user",
            content: `Is this following sentence in the language ${language} correct? "${messages[0].text}". 
            Reply "Yes" or "No", follow with what is wrong with the linguistic structure/grammar or the mistake the student has make, and the correct answer/suggestion, as a ${language} Language teacher talking to me.
            Please refer to the student as "you", be precise and and write suggestions and mistakes in bullet points. Be aware that the sentence is sent in a Chat/Messenging app, hence scenarios like incomplete sentences are less important and hence shouuld say No as there is no mistake.`,
          },
        ],
        temperature: 0,
        max_tokens: 300,
      })
      .then((response) => {
        const correctedText = response.data.choices[0].message;
        console.log(correctedText);
        sendNewMessage(
          route.params.id,
          messages[0].text,
          user.uid,
          correctedText?.content.includes("No"),
          correctedText?.content
        );
      })
      .catch((error) => {
        console.error("Error calling OpenAI API:", error.response.data.message);
        sendNewMessage(
          route.params.id,
          messages[0].text,
          user.uid,
          true,
          "OpenAPI Error"
        );
      });
  }, []);

  const renderInputToolbar = (props) => (
    <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  );

  const renderComposer = (props) => (
    <Composer {...props} textInputStyle={styles.textInput} />
  );

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendBtn}>
      <Icon as={MaterialCommunityIcons} name="send" color="#3979ee" size={8} />
    </Send>
  );

  const renderMessageText = (props: object) => {
    const { currentMessage } = props;

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {currentMessage.warning && (
          <Popover
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            trigger={(triggerProps) => {
              return (
                <IconButton
                  {...triggerProps}
                  icon={
                    <Icon
                      as={Ionicons}
                      name="warning-outline"
                      color="orange.500"
                      size={4}
                    />
                  }
                  onPress={() => setIsOpen(true)}
                  variant="unstyled"
                  size="xs"
                />
              );
            }}
          >
            <Popover.Content accessibilityLabel="Language Tips" w="56">
              <Popover.Arrow />
              <Popover.CloseButton />
              <Popover.Header>Language Tips</Popover.Header>
              <Popover.Body>{props.currentMessage.warningText}</Popover.Body>

              <Popover.Footer justifyContent="flex-end">
                <Button.Group space={2}>
                  <Button
                    colorScheme="coolGray"
                    variant="ghost"
                    onPress={() => setIsOpen(false)}
                  >
                    Ignore
                  </Button>
                  <Button colorScheme="danger" onPress={() => setIsOpen(false)}>
                    Continue
                  </Button>
                </Button.Group>
              </Popover.Footer>
            </Popover.Content>
          </Popover>
        )}
        <MessageText {...props} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          zIndex={20}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="arrow-left"
              color="grey"
              size={10}
            />
          }
          onPress={() => navigation.goBack()}
        />
        <Button variant="unstyled">
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="profile"
            height={39}
            width={39}
            borderRadius={20}
          />
        </Button>
        <Text fontSize={18} fontWeight={600}>
          {route.params.name}
        </Text>
      </View>
      <VStack flex={1} w="100%">
        <GiftedChat
          renderUsernameOnMessage={true}
          onSend={onSend}
          messages={messages}
          user={{ _id: user.uid }}
          renderInputToolbar={renderInputToolbar}
          renderComposer={renderComposer}
          renderSend={renderSend}
          renderMessageText={renderMessageText}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(ChatBox);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sendBtn: {
    paddingBottom: 5,
    paddingRight: 15,
  },
  textInput: {
    backgroundColor: "#ececec",
    marginLeft: 20,
    paddingLeft: 10,
    paddingTop: 10,
    marginRight: 20,
    borderRadius: 20,
  },
  inputToolbar: {
    paddingTop: 5,
    marginBottom: -5,
  },
});
