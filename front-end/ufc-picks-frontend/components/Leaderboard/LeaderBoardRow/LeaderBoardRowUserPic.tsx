import { View, StyleSheet } from "react-native";

type Props = {
    
}

export default function LeaderBoardRowUserPic({ }) {
    return (
        <View style={styles.userPicConatiner}>
            <View style={styles.userPic}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    userPicConatiner: {
        width: "15%",
        justifyContent: "center",
        alignItems: "flex-start",
    },

    userPic: {
        borderRadius: "50%",
        height: 35,
        width: 35,
        backgroundColor: "rgba(131, 131, 131, 0.19)"
    },

});