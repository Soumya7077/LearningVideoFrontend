import { Button, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";  
import { styles } from "./HomeStyle";
import storage from "@react-native-firebase/storage";
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useRef, useState } from "react";

export default function Home() {

    const video = useRef(null);
    const [status, setStatus] = useState({});

    // useEffect(() => {
    //     storage().ref()
    // },[])

  return (
    <View style={styles.container}>
      {/* ==================================Banner Starting============================ */}

      <PagerView style={styles.container} initialPage={0}>
        <View key="1">
          <View style={styles.card} key="2">
            <Text>First Banner</Text>
            <Text>Swipe ➡️</Text>
          </View>
        </View>
        <View style={styles.card} key="3">
          <Text>Second Banner</Text>
        </View>
        <View style={styles.card} key="4">
          <Text>Third Banner</Text>
        </View>
      </PagerView>

    <View style={styles.popularContainer}>
    <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
    </View>
      {/* ====================================Banner Ending=============================== */}
    </View>
  );
}
