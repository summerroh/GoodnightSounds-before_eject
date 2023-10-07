import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import SoundsScreen from "./app/screens/SoundsScreen";
import PresetScreen from "./app/screens/PresetScreen";
import StoryListScreen from "./app/screens/StoryListScreen";
// import StoryPlayScreen from "./app/screens/StoryPlayScreen";

import { StoryProvider } from "./app/context/StoryContext";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import defaultStyles from "./style";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [presetImages, setPresetImages] = useState("Hi there");
  const value = { presetImages, setPresetImages };

  // 폰트 로딩
  let [fontsLoaded] = useFonts({
    IBMPlexSansThin: require("./assets/fonts/IBMPlexSans/IBMPlexSans-Thin.ttf"),
    IBMPlexSansLight: require("./assets/fonts/IBMPlexSans/IBMPlexSans-Light.ttf"),
    IBMPlexSansRegular: require("./assets/fonts/IBMPlexSans/IBMPlexSans-Regular.ttf"),
    IBMPlexSansMedium: require("./assets/fonts/IBMPlexSans/IBMPlexSans-Medium.ttf"),
  });

  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  // Firestore에서 데이터 받아오기
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "image"));

    querySnapshot.docs.forEach((doc) => {
      const urls = doc.data().urls;
      setPresetImages(urls);
    });
  };

  function StoryStack() {
    return (
      <Stack.Navigator
        initialRouteName="storyListScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="storyListScreen" component={StoryListScreen} />
        {/* <Stack.Screen name="storyPlayScreen" component={StoryPlayScreen} /> */}
      </Stack.Navigator>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StoryProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: defaultStyles.colors.white,
            // tabBarInactiveTintColor: defaultStyles.colors.primary,
            tabBarItemStyle: { marginVertical: 6 },
            tabBarStyle: {
              height: 56,
              backgroundColor: defaultStyles.colors.secondary,
            },
          }}
        >
          <Tab.Screen
            name="StoryStack"
            component={StoryStack}
            options={{
              tabBarLabel: "Stories",
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Feather
                    name="book-open"
                    size={30}
                    color={defaultStyles.colors.white}
                  />
                ) : (
                  <Feather
                    name="book-open"
                    size={24}
                    color={defaultStyles.colors.primary}
                  />
                );
              },
            }}
          />

          <Tab.Screen
            name="soundsScreen"
            component={SoundsScreen}
            options={{
              tabBarLabel: "Sounds",
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Feather
                    name="headphones"
                    size={30}
                    color={defaultStyles.colors.white}
                  />
                ) : (
                  <Feather
                    name="headphones"
                    size={24}
                    color={defaultStyles.colors.primary}
                  />
                );
              },
            }}
          />

          <Tab.Screen
            name="presetScreen"
            component={PresetScreen}
            options={{
              tabBarLabel: "Presets",
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Feather
                    name="bookmark"
                    size={30}
                    color={defaultStyles.colors.white}
                  />
                ) : (
                  <Feather
                    name="bookmark"
                    size={24}
                    color={defaultStyles.colors.primary}
                  />
                );
              },
            }}
          />

          {/* <Stack.Screen name="soundsScreen" component={SoundsScreen} />
          <Stack.Screen
          name="presetScreen"
          component={PresetScreen}
          options={{
            animation: "slide_from_right",
            }}
          /> */}
        </Tab.Navigator>
        {/* </Stack.Navigator> */}
      </NavigationContainer>
    </StoryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
