import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const colors = {
  white: "#ffffff",
  black: "#000000",
  primary: "#212133",
  secondary: "#353546",
  highlight: "#231D68",
  grey: {
    100: "#8D8D8D",
    200: "#7A7A8E",
    300: "#272739",
    400: "#D2D2E8",
    500: "#5E5E71",
  },
};
const defaultStyles = {
  screenWidth,
  screenHeight,
  colors,
  flexRow: {
    flexDirection: "row",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowContainerCentered: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainerFlexStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mt40: {
    marginTop: 40,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mb40: {
    marginBottom: 40,
  },
  ml10: {
    marginLeft: 10,
  },
  ml20: {
    marginLeft: 20,
  },
  ml30: {
    marginLeft: 30,
  },
  // fonts
  screenHeader: {
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
    marginLeft: 6,
    fontFamily: "IBMPlexSansThin",
  },
  storyTitle: {
    fontSize: 48,
    color: "#fff",
    marginBottom: 14,
    marginLeft: 6,
    fontFamily: "IBMPlexSansThin",
    width: "70%",
    textAlign: "center",
  },
  storySubTitle: {
    color: colors.grey[200],
    fontSize: 24,
    fontWeight: "100",
    marginLeft: 4,
    fontFamily: "IBMPlexSansLight",
  },
  storyTumbnailTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "IBMPlexSansRegular",
  },
  storyThumbnailSubTitle: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "IBMPlexSansLight",
  },
  soundCardHeader: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
    marginBottom: 8,
    fontFamily: "IBMPlexSansThin",
  },
  soundCard: {
    fontSize: 14,
    color: "#000",
    fontFamily: "IBMPlexSansLight",
    textAlign: "center",
  },
  modalTitle: {
    color: colors.grey[200],
    fontSize: 24,
    fontFamily: "IBMPlexSansLight",
    textAlign: "center",
  },
  modalButton: {
    color: colors.grey[200],
    fontSize: 22,
    includeFontPadding: false,
    fontFamily: "IBMPlexSansLight",
  },
  presetTitle: {
    color: colors.white,
    fontSize: 18,
    includeFontPadding: false,
    fontFamily: "IBMPlexSansThin",
  },
};

export default defaultStyles;
