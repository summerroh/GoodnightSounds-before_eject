import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Feather, EvilIcons } from "@expo/vector-icons";

import defaultStyles from "../../style";
import StorySound from "../components/StorySound";
import CloseModal from "../components/CloseModal";

export default function StoryPlayModal({
  modalVisible,
  setModalVisible,
  item,
}) {
  const [voice, setVoice] = useState(new Audio.Sound());
  const [preset, setPreset] = useState([]);
  const [closeModalVisible, setCloseModalVisible] = useState(false);

  // 유저가 뒤로가기 버튼을 누르고 확인창에서 나간다고 확인 하면 뒤로 보내주는 펑션
  const handleConfirmLeave = () => {
    stopAndUnloadVoice();
    setCloseModalVisible(false);
    setModalVisible(false);
  };

  const stopAndUnloadVoice = async () => {
    try {
      if (voice._loaded) {
        await voice.stopAsync();
        await voice.unloadAsync();
      }
    } catch (error) {
      console.log("Error stopping and unloading voice:", error);
    }
  };

  useEffect(() => {
    if (!voice._loaded) {
      // 파이어베이스에서 목소리 파일 가져오기
      fetchData();
      if (item) {
        setPreset(item.presetsData);
      }
    }
  }, [modalVisible]);

  const audioUrl = item.voiceUrl;
  const fileUri =
    FileSystem.documentDirectory + `${item.name}-v${item.version}.mp3`;

  const downloadAudio = async () => {
    try {
      const downloadResult = await FileSystem.downloadAsync(audioUrl, fileUri);
      if (downloadResult.status === 200) {
        console.log("Audio downloaded successfully:", downloadResult.uri);

        // Now you can use the downloaded fileUri for playback or other purposes
        playVoice(fileUri);
      } else {
        console.error(
          "Failed to download audio. Status:",
          downloadResult.status
        );
      }
    } catch (error) {
      console.error("Error while downloading audio:", error);
    }
  };

  // 스토리 클릭시,
  // 1. 그 스토리가 기기 내에 저장되어 있는지 확인
  // 2. 저장되어 있지 않을 시, 다운로드 후 재생
  // 3. 저장되어 있을 시, 재생
  const fetchData = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      // 3. 저장되어 있을 시
      if (fileExists.exists) {
        console.log(
          "저장된 스토리 오디오 파일이 있습니다.",
          "파일 이름:",
          fileUri
        );
        // Voice재생
        playVoice(fileUri);

        // 2. 저장되어 있지 않을 시
      } else {
        console.log("저장된 스토리 오디오 파일이 없습니다.");
        // 다운로드
        downloadAudio();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const playVoice = async (soundUrl) => {
    try {
      await voice.loadAsync({ uri: soundUrl });
      await voice.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    // console.log(item);
    return (
      <View style={styles.soundCard}>
        <StorySound
          itemName={item.name}
          itemMusic={item.sound}
          iconUri={item.iconUri}
          preset={preset}
        />
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setCloseModalVisible(true);
      }}
    >
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.backgroundImage}
      >
        <View style={styles.topContainer}>
          <EvilIcons
            name="close"
            size={40}
            color={defaultStyles.colors.grey[100]}
            style={styles.xIcon}
            onPress={() => setCloseModalVisible(true)}
          />
          <Text style={defaultStyles.storyTitle}>
            {item.name.replace(/\\n/g, "\n")}
          </Text>

          <View style={defaultStyles.rowContainer}>
            <Feather
              name="clock"
              size={18}
              color={defaultStyles.colors.grey[200]}
              style={{ marginTop: 3 }}
            />
            <Text style={defaultStyles.storySubTitle}>
              <Text style={{ fontFamily: "IBMPlexSansRegular" }}>
                {item.duration}
              </Text>
              min
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={item.soundsData}
            keyExtractor={(Item) => Item.name}
            renderItem={renderItem}
          />
        </View>

        <CloseModal
          modalVisible={closeModalVisible}
          setModalVisible={setCloseModalVisible}
          onConfirm={handleConfirmLeave}
        />
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(33, 33, 51, 0.85)",
    // backgroundColor: defaultStyles.colors.primary,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(33, 33, 51, 0.85)",
    // backgroundColor: defaultStyles.colors.primary,
  },
  row: {
    justifyContent: "center",
    marginVertical: 15,
    width: defaultStyles.screenWidth,
  },
  soundCard: {
    paddingHorizontal: 15,
  },
  xIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // backgroundColor: "red",
  },
});
