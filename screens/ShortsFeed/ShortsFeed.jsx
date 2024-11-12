import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import storage from '@react-native-firebase/storage';
import { useIsFocused } from '@react-navigation/native'; 
import { color } from '../../assets/colors/theme';
import { styles } from './ShortsFeedStyle';



const ShortsFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]); 
  const isFocused = useIsFocused(); 

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const videoRefs = ['coursevideos/Course-14.mkv', 'coursevideos/Course-4.mkv', 'coursevideos/Course-1.mkv', 'coursevideos/Course-2.mkv', 'coursevideos/Course-5.mkv',];
        const videoPromises = videoRefs.map(async (path) => {
          const url = await storage().ref(path).getDownloadURL();
          return { id: path, url };
        });
        const videoList = await Promise.all(videoPromises);
        setVideos(videoList);
      } catch (error) {
        console.error('Error fetching videos: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleIndex = viewableItems[0].index;
      setCurrentVideoIndex(visibleIndex);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const playCurrentVideo = (index) => {
    videoRefs.current[index]?.playAsync();
  };

  const pauseAllVideos = () => {
    videoRefs.current.forEach((ref) => {
      if (ref) {
        ref.pauseAsync();
      }
    });
  };

  const pauseOtherVideos = (index) => {
    videoRefs.current.forEach((ref, idx) => {
      if (ref && idx !== index) {
        ref.pauseAsync();
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      playCurrentVideo(currentVideoIndex);
      pauseOtherVideos(currentVideoIndex);
    } else {
      pauseAllVideos();
    }
  }, [isFocused, currentVideoIndex]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.videoContainer}>
        <StatusBar />
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          source={{ uri: item.url }}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={isFocused && index === currentVideoIndex} // Play only when screen is focused and video is visible
          isLooping
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};



export default ShortsFeed;
