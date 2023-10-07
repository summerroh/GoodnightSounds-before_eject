// 10월 3일 background task 구현하기 전의 working code

import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Slider } from "@miblanchard/react-native-slider";
import defaultStyles from "../../style";
import { useIsFocused } from "@react-navigation/native";

function StorySound({ itemName, itemMusic, iconUri }) {
  const [soundObj, setSoundObj] = useState(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  // 새 preset이 들어왔을때 기존 preset을 리셋해주기 위한 state

  const isFocused = useIsFocused();

  // 화면에서 나가면 소리 꺼지기
  useEffect(() => {
    handlePress(itemMusic);
    return () => {
      stopSound();
    };
  }, [isFocused]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      // interruptionModeIOS: Audio.InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    }).catch(console.error);
  }, []);

  const stopSound = async () => {
    setIsPlaying(false);
    await soundObj.unloadAsync();
  };

  const handlePress = async (audio) => {
    setIsPlaying(!isPlaying);
    setVolume(0.5);

    if (!isPlaying) {
      playAudioInBackground(audio);
    } else {
      await soundObj.unloadAsync();
    }
  };

  const playAudioInBackground = async (audio) => {
    await soundObj.loadAsync(
      { uri: audio },
      { shouldPlay: true, isLooping: true }
    );
    await soundObj.setVolumeAsync(0.5);
  };

  const volumeControl = async (value) => {
    // value: 0.0 ~ 1.0
    setVolume(value);
    if (soundObj._loaded) {
      await soundObj.setVolumeAsync(value).catch(console.error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePress(itemMusic)}
        style={[
          styles.soundCard,
          {
            borderColor: isPlaying
              ? defaultStyles.colors.white
              : defaultStyles.colors.grey[200],
          },
          isPlaying && { backgroundColor: defaultStyles.colors.secondary },
        ]}
      >
        {iconUri && (
          <Image
            source={{
              uri: iconUri,
            }}
            style={{
              width: 22,
              height: 22,
              // marginBottom: 4,
              resizeMode: "contain",
            }}
          />
        )}

        <Text
          style={[
            defaultStyles.soundCard,
            { color: isPlaying ? defaultStyles.colors.white : "#fff" },
          ]}
        >
          {itemName.replace(/\\n/g, "\n")}
        </Text>
      </TouchableOpacity>
      {isPlaying && (
        <Slider
          containerStyle={{
            width: 70,
            height: 30,
          }}
          minimumValue={0.0}
          maximumValue={1.0}
          step={0.1}
          value={volume}
          onValueChange={(value) => volumeControl(value[0])}
          thumbStyle={{ height: 14, width: 14 }}
          thumbTintColor={defaultStyles.colors.grey[200]}
          minimumTrackTintColor={defaultStyles.colors.grey[200]}
          maximumTrackTintColor={defaultStyles.colors.secondary}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  soundCard: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    color: "black",
  },
});

export default StorySound;
