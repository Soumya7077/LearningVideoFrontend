import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  Linking,
  Image,
  ScrollView,
  Pressable
} from "react-native";
import { styles } from "./CourseDetailsStyle";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useState } from "react";
import storage from "@react-native-firebase/storage";
import { color } from "../../assets/colors/theme";
import { globalStyles } from "../../assets/styles/style";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import { BASEURL } from "../../config";
import Feather from "@expo/vector-icons/Feather";


export default function CourseDetails({ navigation, route }) {
  const { courseDetails } = route?.params;

  const [chapters, setChapters] = useState([]);
  const course = JSON.parse(courseDetails);
  // const [loading, setLoading] = useState(false);
  // const [url, setUrl] = useState("");
  // const [selectedPrinter, setSelectedPrinter] = useState();

  // const getFirebaseVideo = async () => {
  //   try {
  //     setLoading(true);
  //     const videourl = await storage()
  //       .ref(`coursevideos/${course?.videourl}`)
  //       .getDownloadURL();
  //     setUrl(videourl);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getChapters = async () => {
    const courseId = course?._id;

    axios({
      method: "get",
      url: `${BASEURL}/getchapters/${courseId}`,
    })
      .then((res) => {
        // console.log(res.data);
        setChapters(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getChapters();
  }, [courseDetails]);

  // const downloadPdf = async (courseId) => {
  //   axios({
  //     method:'get',
  //     url:`${BASEURL}/getcoursepdf/${courseId}`
  //   }).then((async res => {
  //     // console.log(res.data);
  //    const pdf =  await storage()
  //       .ref(`coursepdf/${res.data.downloadLink}`)
  //       .getDownloadURL();
  //       await Linking.openURL(pdf);
  //   })).catch((err) => {
  //     console.log(err);
  //     Alert.alert("Oops!", "The content was not found");
  //   })
  // };

  return (
    <ScrollView style={styles.container}>
      {chapters.length > 0 &&
        chapters.map((chapter, index) => {
          const desc = (chapter?.chapterDesc).slice(0,40)
          return (
            <View style={styles.chapterContainer} key={chapter._id}>
              <View style={styles.topContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>Chapter-{index+1}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Feather name="clock" size={20} color={color.neutral[500]} />
                  <Text style={styles.timeText}>{chapter?.chapterTiming}</Text>
                </View>
              </View>
              <Pressable style={styles.bottomContainer} onPress={() => navigation.navigate("ChapterDetails", { chapterDetails: JSON.stringify(chapter) })}>
                <Text style={styles.chapterName}>{chapter?.chapterName}</Text>
                <Text style={styles.chapterDesc}>
                  {desc}...
                </Text>
              </Pressable>
            </View>
          );
        })}

        {
          chapters.length == 0 && (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:color.danger, fontSize:16, alignSelf:'center'}}>No Chapters Found</Text>
          </View>  
          )
        }

        <View style={{paddingBottom:12}} />
    </ScrollView>
  );
}
