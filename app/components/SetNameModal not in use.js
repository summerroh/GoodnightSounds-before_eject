import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
  FlatList,
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
  // const importAll = (r) => {
  //   return r.keys().map(r);
  // };

  // Import all PNG images from the assets/presets directory
  // const images = importAll(
  //   require.context("../../assets/presets", false, /\.(png)$/)
  // );

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
          <View style={defaultStyles.flexRow}>
            <ImageBackground
              source={images[8]}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <TextInput onChangeText={onChangeText} value={text} />
            </ImageBackground>

            <View style={styles.flatListContainer}>
              <FlatList
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <>
                      <Image
                        source={item}
                        style={styles.imageBackgroundSmall}
                        resizeMode="cover"
                      />
                    </>
                  );
                }}
              />
            </View>
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => onPressFunc(currentItem)}
          >
            <Text style={styles.textStyle}>Save Preset</Text>
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
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#fff",
  },
  imageBackground: {
    width: 150,
    height: 169,
    borderRadius: 10,
    overflow: "hidden", // This prevents content from overflowing outside the ImageBackground
    marginRight: 5,
  },
  imageBackgroundSmall: {
    width: 70,
    height: 80,
    marginLeft: 4,
    marginBottom: 4,
    borderRadius: 10,
  },
  flatListContainer: {
    height: 169,
  },
});
