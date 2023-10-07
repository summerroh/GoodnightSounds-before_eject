import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import defaultStyles from "../../style";

export default function NameModal({
  modalVisible,
  setModalVisible,
  editName,
  onChangeText,
  currentItem,
}) {
  const [presetName, setPresetName] = useState("");

  // console.log("currentItem---------", currentItem);

  useFocusEffect(
    React.useCallback(() => {
      // 한 프리셋의 수정 버튼이 클릭된 경우 그 프리셋의 이름을 불러온다.
      if (currentItem) {
        let presetName = currentItem[1].find(
          (preset) => preset.presetName
        )?.presetName;
        setPresetName(presetName);
        onChangeText(presetName);
      }
      return () => {};
    }, [currentItem])
  );

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
            <Feather
              name="x"
              size={24}
              color={defaultStyles.colors.grey[200]}
            />
          </Pressable>

          <Text style={defaultStyles.modalTitle}>Change Name</Text>

          <View style={[styles.inputBox]}>
            <TextInput
              style={styles.inputText}
              onChangeText={onChangeText}
              defaultValue={presetName}
            />
          </View>

          <Pressable
            style={[styles.button]}
            onPress={() => editName(currentItem)}
          >
            <Text style={defaultStyles.modalButton}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 40,
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
