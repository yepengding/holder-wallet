import {Alert, Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import {Separator} from "../components/UtilView";

/**
 * DID Screen
 *
 * @return {JSX.Element}
 * @constructor
 * @author Yepeng Ding
 */
export const DIDScreen = () => {

    const [localDID, setLocalDID] = useState('');

    useEffect(() => {
        (async () => getLocalDID())();
    })

    /**
     * Create DID and store into local storage
     *
     * @return {Promise<void>}
     */
    const createDID = async () => {
        try {
            await AsyncStorage.setItem('did', "did:test:0001");
            setLocalDID(await getLocalDID());
        } catch (e) {
            Alert.alert("Failed to create DID.");
        }
    }

    /**
     * Get DID from local storage
     *
     * @return {Promise<string|string>}
     */
    const getLocalDID = async () => {
        try {
            const value = await AsyncStorage.getItem('did');
            return value !== null ? value : "";
        } catch (error) {
            Alert.alert("Failed to read local DID.");
        }
    }

    /**
     * Clear local DID
     *
     * @return {Promise<void>}
     */
    const clearLocalDID = async () => {
        try {
            await AsyncStorage.removeItem('did');
            setLocalDID("");
        } catch (e) {
            Alert.alert("Failed to remove DID.");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.didView}>
                <Text>{localDID}</Text>
            </View>
            <Separator/>
            <View style={styles.buttonView}>
                <Button
                    title="Create DID"
                    onPress={() => createDID()}
                    disabled={localDID !== ""}
                />
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="Remove DID"
                    color="#dc3545"
                    onPress={() => clearLocalDID()}
                    disabled={localDID === ""}
                />
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
    didView: {
        margin: 16
    },
    buttonView: {
        margin: 8
    }
});
