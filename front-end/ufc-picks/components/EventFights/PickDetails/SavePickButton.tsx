import { Pressable, StyleSheet, Text, View } from "react-native";


export default function SavePicksButton({ }) {
    return (
        <View style={styles.saveContainer}>
            <Pressable style={styles.saveButton}>
                <Text style={styles.buttonText}>Save Pick</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonText: {
        color: "white",
        fontWeight: "700"
    },

    saveContainer: {
        // borderWidth: 1,
        borderColor: "white",
        height: 55,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    saveButton: {
        borderWidth: 1,
        borderColor: "yellow",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "95%",
        borderRadius: 10
    }
})