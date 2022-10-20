import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

/**
 * Credential Screen
 *
 * @return {JSX.Element}
 * @constructor
 * @author Yepeng Ding
 */
export const CredentialScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View>
                <Text style={styles.title}>My Credentials</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 16,
    },
    title: {
        fontSize: 30,
        marginTop: 50,
        alignSelf: 'center',
    }
});
