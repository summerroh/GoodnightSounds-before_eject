import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SectionList,
  TouchableOpacity,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
  RepeatMode,
  AppKilledPlaybackBehavior,
} from "react-native-track-player";

import { Entypo, Feather } from "@expo/vector-icons";
const SilenceTrack =
  "https://firebasestorage.googleapis.com/v0/b/goodnightsounds-d5cd5.appspot.com/o/silence.mp3?alt=media&token=8cb28027-60cc-40c7-9e49-b8f7b3727d1a&_gl=1*quk9jp*_ga*MTA1MDU3NTQ1OS4xNjgxNzc4ODMx*_ga_CW55HF8NVT*MTY5NzA4MjQ3OS4xNzUuMS4xNjk3MDgyNTE4LjIxLjAuMA..";

import Screen from "../components/Screen";
import Sound from "../components/Sound";
import SetNameModal from "../components/SetNameModal";
import { useFocusEffect } from "@react-navigation/native";
import defaultStyles from "../../style";
import { useStoryPlaying } from "../context/StoryContext";
// import MusicPlayer from "../components/MusicPlayer";

function SoundsScreen({ navigation, route }) {
  const [selectedItem, setSelectedItem] = useState([]);
  const [preset, setPreset] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("Preset Name");
  const [data, setData] = useState([]);
  const { pause, setPause, setResume } = useStoryPlaying();

  //////// Track Player //////
  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          // Capability.SkipToNext,
          // Capability.SkipToPrevious,
        ],
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
      });

      // Define your music track details (e.g., URL, title, artist).
      const track = {
        id: "your_track_id",
        url: SilenceTrack, // Replace with your audio file URL
        title: "Goodnight Sounds",
        artist: "is now playing",
        duration: 0, // Set duration to 0 for streaming audio
        artwork: require("../../assets/icon.png"),
      };

      // Add the track to the queue.
      await TrackPlayer.add([track]);

      // Play the track.
      // await TrackPlayer.play();
      // await TrackPlayer.setRepeatMode(RepeatMode.Track);
    } catch (error) {
      console.error("Error setting up player: ", error);
    }
  };

  // Add this code inside your useEffect after calling setupPlayer
  // useEffect(() => {
  //   const onPlaybackTrackChanged = async (data) => {
  //     if (data.state === STATE_PLAYING) {
  //       // The track is playing; you can handle any related logic here
  //     }
  //   };

  //   // Subscribe to the event
  //   TrackPlayer.addEventListener(
  //     TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  //     onPlaybackTrackChanged
  //   );

  //   return () => {
  //     // Unsubscribe from the event when component unmounts
  //     TrackPlayer.removeEventListener(
  //       TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  //       onPlaybackTrackChanged
  //     );
  //   };
  // }, []);

  //////////

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        onChangeText("Preset Name");
      };
    }, [])
  );

  useEffect(() => {
    getData();
    setupPlayer();

    return () => {};
  }, []);

  // Firestore에서 sounds 데이터 받아오기
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "data"));

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: [doc.data().data],
    }));
    setData(documents);
  };

  const { presetsData, item, playStory } = route.params ?? {};
  // console.log("presetsData", presetsData);

  // 프리셋 클릭시 - 음악 플레이되게 하는 기능
  useEffect(() => {
    if (presetsData === undefined) {
      return;
    }
    setPreset(presetsData);
    if (playStory) {
      navigation.navigate("storyPlayScreen", { item: item });
    }
  }, [presetsData]);

  useEffect(() => {
    // console.log("selectedItem: ", selectedItem);
  }, [selectedItem]);

  const storeData = async (value) => {
    setModalVisible(false);

    // console.log("value", value);
    // Preset Name 넣어주기
    let valueWithName = [...value, { presetName: text }];

    let date = JSON.stringify(new Date());

    try {
      // AsyncStorage에 값 저장하기
      await AsyncStorage.setItem(date, JSON.stringify(valueWithName));
    } catch (e) {}
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    return (
      <Sound
        itemName={item.name}
        itemMusic={item.sound}
        iconUri={item.iconUri}
        setSelectedItem={setSelectedItem}
        preset={preset}
      />
    );
  };

  const flatList = ({ item }) => {
    return (
      <FlatList
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={(Item) => Item.name}
        renderItem={renderItem}
      />
    );
  };

  const onSave = () => {
    if (selectedItem.length > 0) {
      setModalVisible(true);
    }
  };

  return (
    <Screen style={styles.screen}>
      {/* <MusicPlayer /> */}

      <View style={styles.container}>
        <SetNameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressFunc={storeData}
          onChangeText={onChangeText}
          text={text}
          currentItem={selectedItem}
        />

        <SectionList
          ListHeaderComponent={
            <View style={styles.listHeadContainer}>
              <Text style={defaultStyles.screenHeader}>
                {/* Goodnight, {"\n"}Summer */}
                Goodnight Sounds
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingBottom: 30,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          sections={data}
          keyExtractor={(item) => item.id}
          renderItem={flatList}
          renderSectionHeader={({ section: { id } }) => (
            <Text style={defaultStyles.soundCardHeader}>{id}</Text>
          )}
        />
        <TouchableOpacity
          style={{
            width: 54,
            height: 54,
            backgroundColor: defaultStyles.colors.secondary,
            position: "absolute",
            right: 20,
            bottom: 20,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => onSave()}
        >
          <Feather name="heart" size={24} color="#fff" />
          <Text style={styles.subText}>Save</Text>
        </TouchableOpacity>

        {/* {pause ? (
          <Button title="resume" onPress={() => setResume(true)}></Button>
        ) : (
          <Button title="pause" onPress={() => setPause(true)}></Button>
        )} */}
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
  },
  listHeadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    justifyContent: "space-between",
    marginVertical: 5,
  },
  subText: {
    fontSize: 12,
    color: "#fff",
    marginTop: -2,
  },
});

export default SoundsScreen;
