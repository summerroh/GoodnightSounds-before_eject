import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React from "react";
import defaultStyles from "../../style";

export default function CloseModal({
  modalVisible,
  setModalVisible,
  onConfirm,
}) {
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
          <Text style={defaultStyles.modalTitle}>
            Do you want to {`\n`}leave the Story?
          </Text>

          <View style={[defaultStyles.rowContainer, defaultStyles.mt10]}>
            <Pressable
              style={[styles.button, { marginRight: 10 }]}
              onPress={onConfirm}
            >
              <Text style={defaultStyles.modalButton}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={defaultStyles.modalButton}>No</Text>
            </Pressable>
          </View>
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
    backgroundColor: "rgba(10, 10, 10, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: defaultStyles.colors.secondary,
    borderWidth: 1,
    borderColor: defaultStyles.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 20,
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
});
