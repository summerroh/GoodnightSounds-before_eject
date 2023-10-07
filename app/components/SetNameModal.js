import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

import defaultStyles from "../../style";

export default function SetNameModal({
  modalVisible,
  setModalVisible,
  onPressFunc,
  text,
  onChangeText,
  currentItem,
}) {
  // /assets/presets 폴더에 있는 이미지들 전부 불러오기
  //   const importAll = (r) => {
  //     return r.keys().map(r);
  //   };

  // Import all PNG images from the assets/presets directory
  //   const images = importAll(
  //     require.context("../../assets/presets", false, /\.(png)$/)
  //   );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              right: 0,
              top: 10,
              zIndex: 10,
            }}
            onPress={() => setModalVisible(false)}
          >
            <Feather name="x" size={24} color={defaultStyles.colors.primary} />
          </Pressable>

          <View style={[styles.inputBox]}>
            <TextInput
              style={styles.inputText}
              onChangeText={onChangeText}
              value={text}
            />
          </View>

          <Pressable
            style={[styles.button]}
            onPress={() => onPressFunc(currentItem)}
          >
            <Text style={defaultStyles.modalButton}>Save Preset</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
  modalBackground: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: defaultStyles.colors.secondary,
    borderWidth: 1,
    borderColor: defaultStyles.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: defaultStyles.colors.grey[300],
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: defaultStyles.colors.grey[200],
  },
  textStyle: {
    color: "#fff",
  },
  flatListContainer: {
    height: 169,
  },
  inputBox: {
    width: 200,
    backgroundColor: defaultStyles.colors.grey[200],
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  inputText: {
    color: defaultStyles.colors.primary,
    fontSize: 22,
    includeFontPadding: false,
    fontFamily: "IBMPlexSansLight",
  },
});
