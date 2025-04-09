import { StyleSheet } from "react-native";
import { color } from "../../assets/colors/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.neutral[100], // Light background for contrast
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },
      averageContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5, // Adds depth effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    gradientBackground: {
        padding: 20,
        alignItems: "center",
        borderRadius: 20, // Smooth corners
    },
    averageText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    scoreText: {
        fontSize: 28,
        fontWeight: "700",
        color: "white",
        marginTop: 5,
    },
    
    card: {
        backgroundColor: "white",
        padding: 20,
        marginVertical: 10,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        paddingBottom: 5,
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        color: color.primary[600], // Use primary color
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        color: color.neutral[700],
    },
    textUrl: {
        fontSize: 14,
        fontWeight: "600",
        color: '#0000EE',
        borderBottomColor: '#0000EE',
        borderBottomWidth: 1,
    },
    dateContainer: {
        alignItems: "flex-end",
    },
    dateText: {
        fontSize: 12,
        color: color.neutral[500],
        fontWeight: "500",
    },
});

export default styles;
