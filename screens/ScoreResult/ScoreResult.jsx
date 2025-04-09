import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./ScoreResultStyle";
import { color } from "../../assets/colors/theme";

const ScoreResult = ({ navigation, route }) => {
  const [assessment, setAssessment] = useState({});

  useEffect(() => {
    const { item } = route.params;
    const assesssmentData = JSON.parse(item);
    setAssessment(assesssmentData);
  }, [route.params]);

  return (
    <View style={styles.container}>
      {/* Gradient Score Header */}
      <LinearGradient colors={["#6A11CB", "#2575FC"]} style={styles.scoreContainer}>
        <Text style={styles.title}>Assessment Results</Text>
        <Text style={styles.scoreText}>
          You Scored{" "}
          <Text style={styles.score}>
            {assessment?.totalScore} / {assessment?.optionAttendByUser?.length}
          </Text>
        </Text>
      </LinearGradient>

      {/* Questions List */}
      <FlatList
        data={assessment?.optionAttendByUser}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.question}>{item.question}</Text>

            <View style={styles.answerContainer}>
              <View
                style={[
                  styles.answerBadge,
                  item.selectedOption === item.correctAnswer ? styles.correctBadge : styles.wrongBadge,
                ]}
              >
                <Ionicons
                  name={item.selectedOption === item.correctAnswer ? "checkmark-circle" : "close-circle"}
                  size={20}
                  color={"#fff"}
                />
                <Text style={styles.badgeText}>
                  {item.selectedOption === item.correctAnswer ? "Correct" : "Incorrect"}
                </Text>
              </View>

              <Text style={styles.answerText}>Your Answer: {item.selectedOption}</Text>
            </View>

            <Text style={styles.correctAnswer}>
              ✅ Correct Answer: <Text style={styles.correctText}>{item.correctAnswer}</Text>
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ScoreResult;
