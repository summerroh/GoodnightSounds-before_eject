import TrackPlayer from "react-native-track-player";

module.exports = async function () {
  try {
    TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());
    TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());
    TrackPlayer.addEventListener("remote-next", () => TrackPlayer.skipToNext());
    TrackPlayer.addEventListener("remote-previous", () =>
      TrackPlayer.skipToPrevious()
    );
  } catch (error) {
    console.error("error in service.js", error);
  }
};
