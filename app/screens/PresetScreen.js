import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

import Screen from "../components/Screen";
import NameModal from "../components/NameModal";
import defaultStyles from "../../style";
import { useFocusEffect } from "@react-navigation/native";

function PresetScreen({ navigation }) {
  const [presetData, setPresetData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("Default Preset Name");
  const [currentItem, setCurrentItem] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  // AsyncStorage의 모든 아이템을 가져오기
  const getData = async () => {
    try {
      // AsyncStorage의 모든 키 가져오기
      let keys = await AsyncStorage.getAllKeys();
      // AsyncStorage의 모든 데이터 가져오기
      const presetData = await AsyncStorage.multiGet(keys);

      const parsedData = presetData.map((item) => {
        const [key, value] = item;
        return [key, JSON.parse(value)];
      });

      setPresetData(parsedData);

      // console.log("presetData", parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  // 프리셋 삭제 기능
  const deletePreset = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      getData();
    } catch (e) {
      console.log("Error while deleting the preset", e);
    }
  };

  // 프리셋 리셋 기능 (버튼 숨겨놓음)
  const resetData = async () => {
    try {
      await AsyncStorage.clear();
      getData();
    } catch (e) {}
  };

  // 프리셋 클릭시 - 음악 플레이되게 하는 기능
  // (SoundScreen의 preset을 dependency로 하는 useEffect와 연결됨)
  const handlePress = async (key) => {
    try {
      const presetsData = JSON.parse(await AsyncStorage.getItem(key));
      // console.log(presetsData);
      navigation.navigate("soundsScreen", { presetsData: presetsData });
    } catch (error) {
      console.log(error);
    }
  };

  const editName = async (item) => {
    setModalVisible(!modalVisible);

    let key = item[0];

    // Parse the JSON data stored in AsyncStorage
    let storedData = await AsyncStorage.getItem(key);
    let parsedData = JSON.parse(storedData);

    // Find the item with the "presetName" key and update its value
    const updatedItem = parsedData.map((dataItem) => {
      if (dataItem.presetName) {
        return { ...dataItem, presetName: text };
      }
      return dataItem;
    });

    // Save the updated data back to AsyncStorage
    try {
      await AsyncStorage.setItem(key, JSON.stringify(updatedItem));
    } catch (e) {
      console.log("error while updating the preset name", e);
    }
    getData();
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    // console.log("preset item--------:", item);
    // 이름(presetName) 불러오기 (item[0]은 key(date)이고 item[1]에 itemName과 presetName 정보가 있다.)
    const presetName = item[1].find((preset) => preset.presetName)?.presetName;

    return (
      // <ImageBackground
      //   source={require("../../assets/presets/water01.png")}
      //   style={styles.imageBackground}
      //   resizeMode="cover"
      // >
      <View>
        <TouchableOpacity
          onPress={() => handlePress(item[0])}
          style={[styles.soundCard]}
        >
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              left: 16,
              top: 10,
              zIndex: 10,
            }}
            onPress={() => {
              setModalVisible(true);
              setCurrentItem(item);
              // editName(item);
            }}
          >
            <Feather
              name="edit"
              size={19}
              color={defaultStyles.colors.grey[200]}
            />
          </Pressable>
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              right: -4,
              top: 10,
              zIndex: 10,
            }}
            onPress={() => deletePreset(item[0])}
          >
            <Feather
              name="x"
              size={21}
              color={defaultStyles.colors.grey[200]}
            />
          </Pressable>

          <Text style={[defaultStyles.presetTitle]}>{presetName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={defaultStyles.screenHeader}>Saved {`\n`}Presets</Text>
        </View>

        <NameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          editName={editName}
          onChangeText={onChangeText}
          currentItem={currentItem}
        />

        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={presetData}
          keyExtractor={(index) => index}
          renderItem={renderItem}
        ></FlatList>

        {/* 프리셋 리셋버튼 */}
        {/* <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: "green",
            position: "absolute",
            left: 20,
            bottom: 20,
          }}
          onPress={() => resetData()}
        ></TouchableOpacity> */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: defaultStyles.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.primary,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    justifyContent: "space-between",
    marginVertical: 15,
  },
  soundCard: {
    // backgroundColor: "#fff",
    backgroundColor: defaultStyles.colors.secondary,
    width: 150,
    height: 130,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: defaultStyles.colors.grey[200],
  },
  text: {
    color: "black",
  },
  imageBackground: {
    flex: 1,
    width: 150,
    height: 169,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default PresetScreen;
