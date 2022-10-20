import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Separator} from "../components/UtilView";

/**
 * Home Screen
 *
 * @param navigation
 * @return {JSX.Element}
 * @constructor
 * @author Yepeng Ding
 */
export const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View>
                <Text style={styles.title}>Holder Wallet</Text>
            </View>
            <Separator/>
            <View style={styles.buttonView}>
                <Button
                    title="My DID"
                    color="#dc3545"
                    onPress={() => navigation.navigate('DID')}
                />
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="My Credentials"
                    onPress={() => navigation.navigate('Credential')}
                />
            </View>
        </SafeAreaView>
    );
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
    },
    buttonView: {
        margin: 8
    }
});
