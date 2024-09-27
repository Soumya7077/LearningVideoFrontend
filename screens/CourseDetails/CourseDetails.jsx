import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./CourseDetailsStyle";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useState } from "react";
import storage from "@react-native-firebase/storage";
import { color } from "../../assets/colors/theme";
import { globalStyles } from "../../assets/styles/style";

export default function CourseDetails({ navigation, route }) {
  const { courseDetails } = route?.params;
  const course = JSON.parse(courseDetails);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const getFirebaseVideo = async () => {
    try {
      setLoading(true);
      const videourl = await storage()
        .ref(`coursevideos/${course?.videourl}`)
        .getDownloadURL();
      setUrl(videourl);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFirebaseVideo();
  }, [courseDetails]);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={color.primary}
          style={[globalStyles.alineSelfcenter]}
        />
      )}
      {!loading && (
        <>
          <View style={styles.videoContainer}>
            <Video
              style={styles.video}
              source={{
                uri: url,
              }}
              useNativeControls={true}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          </View>
          <View style={styles.courseDetailsContainer}>
            <View>
              <Text style={styles.courseTitle}>{course?.courseName}</Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={styles.courseDesc}>{course?.courseDesc}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
