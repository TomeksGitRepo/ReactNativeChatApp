import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import GroupChatPreview from './GroupChatPreview'

import allChat from '../../assets/images/ChatMainScreen/dummyGroupsImages/logo-02.png'; 
import pmp from '../../assets/images/ChatMainScreen/dummyGroupsImages/pmp.jpg'
import smp from '../../assets/images/ChatMainScreen/dummyGroupsImages/smp.jpg'

const GroupsPreviewContainer= ({navigation, }) => {
  return (
    <View style={styles.column}>
    <GroupChatPreview imageSource={allChat} groupName="Ogólny" lastMessage="Witam na czacie ogólnym" />
    <GroupChatPreview imageSource={smp} groupName="Sprzedaż"  lastMessage="Sprzedaż rośnie." />
    <GroupChatPreview imageSource={pmp} groupName="Produkcja" lastMessage="Kto produkuje?"/>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginBottom: 10

  },
  column: {
    top: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    padding: 20,
    alignSelf: 'auto',
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  inputText: {
      fontSize: 22,
      color: 'white',
  }
});

export default GroupsPreviewContainer;
