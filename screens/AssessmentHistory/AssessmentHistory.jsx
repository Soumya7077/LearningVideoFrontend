import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./AssessmenHistoryStyle";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "../../assets/colors/theme";

export default function AssessmentHistory({ navigation }) {
  const [assessmentData, setAssessmentData] = useState([]);
  const [averageScore, setAverageScore] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalScore, setTotalScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);

  useEffect(() => {
    getAssessmentHistory();
  }, []);

  async function getAssessmentHistory() {
    if (!hasMore || loading) return;

    setLoading(true); // Start loading state

    try {
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      const userId = userData?.user?._id;

      // Fetch paginated results
      const res = await axios.get(
        `${BASEURL}/getassessment/${userId}?page=${page}&limit=5`
      );

      if (res.data?.assessment.length > 0) {
        setAssessmentData((prevData) => {
          // Remove duplicate records before updating state
          const newData = res.data?.assessment.filter(
            (newItem) =>
              !prevData.some((oldItem) => oldItem._id === newItem._id)
          );
          return [...prevData, ...newData];
        });

        // Update total scores dynamically
        const newTotalScore = res.data?.assessment.reduce(
          (acc, curr) => acc + curr?.totalScore,
          totalScore
        );
        const newTotalQuestions = res.data?.assessment.reduce(
          (acc, curr) => acc + curr?.optionAttendByUser.length,
          totalQuestions
        );

        setTotalScore(newTotalScore);
        setTotalQuestions(newTotalQuestions);

        // Calculate new average score
        const newAverageScore = (newTotalScore / newTotalQuestions) * 100;
        setAverageScore(newAverageScore.toFixed(2));

        // Move to next page for next request
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // Stop loading when no more data
      }
    } catch (error) {
      console.log("Error fetching assessment history:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      getAssessmentHistory();
    }
  };

  const renderItem = ({ item }) => {
    const assessmentName = item?.assessmentName.split("_")[1];
    const utcDate = new Date(item.assessmentDate);

    // Convert UTC to local time (24-hour format)
    const localDate = utcDate.toLocaleDateString("en-GB"); // DD/MM/YYYY
    const localTime = utcDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }); // HH:MM

    const questions = item?.optionAttendByUser.length;
    return (
      <View style={styles.card}>
        {/* Titles Row */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.title}>Questions</Text>
          <Text style={styles.title}>Date</Text>
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ScoreResult", { item: JSON.stringify(item) })
            }
          >
            <Text style={styles.textUrl}>{assessmentName}</Text>
          </TouchableOpacity>

          <Text style={styles.text}>{questions}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{localDate}</Text>
            <Text style={styles.dateText}>{localTime}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.averageContainer}>
        <LinearGradient
          colors={["#4CAF50", "#81C784"]} // Gradient shades of green
          style={styles.gradientBackground}
        >
          <Text style={styles.averageText}>Average Score</Text>
          <Text style={styles.scoreText}>{averageScore || 0}%</Text>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <FlatList
          data={assessmentData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore} // Load more when reaching the end
          onEndReachedThreshold={0.1} // Adjust sensitivity for loading
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color={color.primary} /> : null
          }
        />
      </View>
    </>
  );
}
