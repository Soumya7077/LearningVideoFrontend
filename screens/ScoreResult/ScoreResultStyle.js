import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f7fa",
    padding: 20,
  },

  // Gradient Header
  scoreContainer: {
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#6A11CB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
  scoreText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 5,
    fontWeight: "600",
  },
  score: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  // Glassmorphism Question Cards
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "justify",
  },

  // Answer Section
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  answerBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  correctBadge: {
    backgroundColor: "#27ae60",
  },
  wrongBadge: {
    backgroundColor: "#e74c3c",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },
  answerText: {
    fontSize: 16,
    color: "#34495e",
    fontWeight: "bold",
  },

  // Correct Answer Display
  correctAnswer: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "bold",
    marginTop: 5,
  },
  correctText: {
    color: "#27ae60",
    fontWeight: "bold",
  },
});

export default styles;
