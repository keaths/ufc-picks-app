import { COLORS } from "@/theme/colors";
import { View, StyleSheet, Text } from "react-native";

type Props = {
    userName: string
}

export default function LeaderUserInfo({ userName }: Props) {
    return (
        <View style={styles.userContainer}>
            <View>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            {/* <View style={styles.userHandle}>
                <Text>@KeathSawdo</Text>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({

    userContainer: {
        width: "50%",
        
        justifyContent: "center"
    },

    userName: {
        fontWeight: 700,
        color: COLORS.lightText
    },

});