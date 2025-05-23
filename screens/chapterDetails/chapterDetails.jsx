import { ActivityIndicator, Text, TouchableOpacity, View, Platform, Alert, Linking, ScrollView } from "react-native";
import { styles } from "./chapterDetailsStyle";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useState } from "react";
import storage from "@react-native-firebase/storage";
import { color } from "../../assets/colors/theme";
import { globalStyles } from "../../assets/styles/style";
// import * as FileSystem from 'expo-file-system';
// import * as Print from 'expo-print';
// import * as MediaLibrary from 'expo-media-library';
// import axios from "axios";
// import { BASEURL } from "../../config";


export default function ChapterDetails({ navigation, route }) {
  const { chapterDetails } = route?.params;
  const course = JSON.parse(chapterDetails);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  // const [selectedPrinter, setSelectedPrinter] = useState();

  const getFirebaseVideo = async () => {
    try {
      setLoading(true);
      const videourl = await storage()
        .ref(`coursevideos/${course?.videoUrl}`)
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
  }, [chapterDetails]);

  

//   const downloadPdf = async (courseId) => {
//     axios({
//       method:'get',
//       url:$`{BASEURL}/getcoursepdf/${courseId}`
//     }).then((async res => {
//       // console.log(res.data);
//      const pdf =  await storage()
//         .ref(coursepdf/${res.data.downloadLink})
//         .getDownloadURL();
//         await Linking.openURL(pdf);
//     })).catch((err) => {
//       console.log(err);
//       Alert.alert("Oops!", "The content was not found");
//     })
//   };

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
          <ScrollView style={styles.courseDetailsContainer} showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.courseTitle}>{course?.chapterName}</Text>
            </View>
            <View style={styles.descContainer}>
              <Text style={styles.courseDesc}>{course?.chapterDesc}</Text>
            </View>

            {/* <TouchableOpacity style={styles.contentDownloadBtn} onPress={() => downloadPdf(course?._id)}>
              <Text style={styles.btnText}>Download Content</Text>
            </TouchableOpacity> */}
          </ScrollView>
        </>
      )}
    </View>
  );
}