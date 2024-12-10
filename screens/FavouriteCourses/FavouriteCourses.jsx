import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./FavouriteCoursesStyle";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color } from "../../assets/colors/theme";

export default function FavouriteCourseList() {
  const [favCourseList, setFavCourseList] = useState([]);
  const route = useRoute();
  const { user } = route.params;
  const navigation = useNavigation();

  /**=============================List of favourite courses==================== */
  const getFavCourseList = async () => {
    axios({
      method: "get",
      url: `${BASEURL}/getfavcourse/${user?.user?._id}`,
    })
      .then((res) => {
        setFavCourseList(res.data?.favouriteCourseList);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFavCourseList();
  }, [route]);

  /**=============================List of favourite courses==================== */

  /**=================Add remove fav course list========================== */

  const addremoveFavourite = async (courseId) => {
    Alert.alert(
      "Are you sure?",
      "Do you want to remove this course from your favourites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            try {
              axios({
                method: "put",
                url: `${BASEURL}/updatefavcourse/${user?.user?._id}`,
                data: {
                  courseIds: courseId,
                },
              }).then((res) => {
                setFavCourseList((prev) =>
                  prev.filter((course) => course?._id !== courseId)
                );
              });

              // Update local list (this is for demo purposes)
              //   setFavouriteCourseIds((prev) => prev.filter((id) => id !== courseId));

              //   Alert.alert(
              //     "Success",
              //     "The course has been removed from your favourites."
              //   );
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  /**=================Add remove fav course list========================== */

  const renderItem = ({ item }) => {
    const courseDesc = item?.courseDesc;
    const description = courseDesc.substring(0, 20);
    return (
      <View style={styles.container}>
        <View style={styles.courseBox}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              item?.courseType === "free"
                ? navigation.navigate("CourseDetails", {
                    courseDetails: JSON.stringify(item),
                  })
                : Alert.alert(
                    "Please contact to admin for accessing this course"
                  );
            }}
          >
            <Image
              source={{ uri: item?.courseImage }}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <Text style={styles.courseNameStyle}>{item?.courseName}</Text>
            <Text style={styles.descStyle}>{description}...</Text>
            <View style={styles.lastContainer}>
              <View>
                <Text
                  style={
                    item?.courseType === "free"
                      ? styles.freeTypeStyle
                      : styles.paidTypeStyle
                  }
                >
                  {item?.courseType === "free" ? "Free" : "Paid"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => addremoveFavourite(item?._id)}
              >
                <Ionicons name="heart-dislike" size={24} color={color.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No favourite course found</Text>
    </View>
  );

  return (
    <>
      <FlatList
        data={favCourseList}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </>
  );
}
