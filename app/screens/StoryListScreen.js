import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { useStoryPlaying } from "../context/StoryContext";
import Screen from "../components/Screen";
import NameModal from "../components/NameModal";
import defaultStyles from "../../style";
import StoryPlayModal from "../components/StoryPlayModal";

function StoryListScreen({}) {
  const { setIsStoryPlaying } = useStoryPlaying();

  const [presetData, setPresetData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [text, onChangeText] = useState("Default Preset Name");
  const [currentItem, setCurrentItem] = useState("");
  const [data, setData] = useState();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getData();
    return () => setItem(null);
  }, []);

  // 스토리가 플레이되면, Story Context에 isStoryPlaying을 true로 설정하고,
  // 스토리가 꺼지면 Story Context에 isStoryPlaying을 false로 설정하기
  useEffect(() => {
    setIsStoryPlaying(storyModalVisible);
    return () => {};
  }, [storyModalVisible]);

  // Firestore에서 stories 데이터 받아오기
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "stories"));

    const documents = querySnapshot.docs.map((doc) => ({
      data: [doc.data()],
    }));
    setData(documents[0].data[0].data);
    // console.log(documents[0].data[0].data);
  };

  // 프리셋 클릭시 - 음악 플레이되게 하는 기능
  // (SoundScreen의 preset을 dependency로 하는 useEffect와 연결됨)
  const handlePress = async (item) => {
    try {
      setItem(item);
      setStoryModalVisible(true);
      // navigation.navigate("storyPlayScreen", {
      //   item: item,
      // });
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
    return (
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]} // Gradient colors from transparent to semi-transparent black
          style={styles.gradient}
        >
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={[styles.soundCard]}
          >
            <View style={[defaultStyles.rowContainer, styles.pill]}>
              <Text style={[defaultStyles.storyThumbnailSubTitle]}>
                <Text style={{ fontFamily: "IBMPlexSansRegular" }}>
                  {item.duration}
                </Text>
                min
              </Text>
            </View>

            <Text style={[defaultStyles.storyTumbnailTitle]}>
              {item.name.replace(/\\n/g, "\n")}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={defaultStyles.screenHeader}>
            Nighttime {`\n`}Stories
          </Text>
        </View>

        {item && (
          <StoryPlayModal
            modalVisible={storyModalVisible}
            setModalVisible={setStoryModalVisible}
            item={item}
          />
        )}

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
          data={data}
          keyExtractor={(index) => index}
          renderItem={renderItem}
        />
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
    paddingBottom: 30,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    justifyContent: "space-between",
    marginVertical: 15,
  },
  gradient: {
    borderRadius: 24,
  },
  soundCard: {
    width: 150,
    height: 170,
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 14,
  },
  imageBackground: {
    width: 150,
    height: 170,
    borderRadius: 24,
    overflow: "hidden",
  },
  pill: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default StoryListScreen;
