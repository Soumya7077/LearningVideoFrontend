import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./CourseStyle";
import { useNavigation } from "@react-navigation/native";

export default function Courses() {

    const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable style={styles.card} onPress={() => navigation.navigate('CourseDetails')}>
          <View style={styles.cardHeader}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png",
              }}
              style={styles.cardImage}
            />
          </View>
          <Text style={styles.courseName}>Introduction N..</Text>
          <Text style={styles.courseDesc}>Lorem ipsum ip ...</Text>
        </Pressable>
        <Pressable style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png",
              }}
              style={styles.cardImage}
            />
          </View>
          <Text style={styles.courseName}>Introduction N..</Text>
          <Text style={styles.courseDesc}>Lorem ipsum ip ...</Text>
        </Pressable>
        <Pressable style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png",
              }}
              style={styles.cardImage}
            />
          </View>
          <Text style={styles.courseName}>Introduction N..</Text>
          <Text style={styles.courseDesc}>Lorem ipsum ip ...</Text>
        </Pressable>
        <Pressable style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png",
              }}
              style={styles.cardImage}
            />
          </View>
          <Text style={styles.courseName}>Introduction N..</Text>
          <Text style={styles.courseDesc}>Lorem ipsum ip ...</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
