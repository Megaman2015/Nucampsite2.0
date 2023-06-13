import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function Loading() {
    return (
        <View style={StyleSheet.loadingVeiw}>
            <ActivityIndicator size="large" color="#5637DD" />
            <Text style={StyleSheet.loadingText}>One Second....</Text>
        </View>
    );
}

const style = StyleSheet.create({
    loadingVeiw: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    loadingText: {
        color: "#567DD",
        fontSize: 14,
        fontWeight: "bold",
    },
});
export default Loading;
