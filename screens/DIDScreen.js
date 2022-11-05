import {Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import {Separator} from "../components/UtilView";
import {createDID} from "../api/DIDAPIs";
import {Assert} from "../util/Assertion";

/**
 * DID Screen
 *
 * @return {JSX.Element}
 * @constructor
 * @author Yepeng Ding
 */
export const DIDScreen = () => {

    const [identifier, setIdentifier] = useState('');
    const [localDID, setLocalDID] = useState('');
    const [privateKeys, setPrivateKeys] = useState({authKey: '', assertKey: ''});

    useEffect(() => {
        (async () => getLocalDIDInfo())();
    })

    /**
     * Issue a new self-controlled DID and store into local storage
     *
     * @return {Promise<void>}
     */
    const issueDID = async () => {
        Assert.isTrue(identifier && identifier.length > 0 && identifier.length <= 255, () => {
            Alert.alert("Invalid identifier.");
        });
        try {
            createDID("holder", identifier).then(async (data) => {
                if (data) {
                    await AsyncStorage.setItem('did', data.did);
                    await AsyncStorage.setItem('authenticationPrivateKey', data.authenticationPrivateKey);
                    await AsyncStorage.setItem('assertionMethodPrivateKey', data.assertionMethodPrivateKey);
                    await getLocalDIDInfo();
                }
            })
        } catch (e) {
            Alert.alert("Failed to create DID.");
            throw Error;
        }
    }

    /**
     * Get DID from local storage
     *
     * @return {Promise<string|string>}
     */
    const getLocalDIDInfo = async () => {
        try {
            let did = await AsyncStorage.getItem('did');
            did = did !== null ? did : "";
            setLocalDID(did);

            let authKey = await AsyncStorage.getItem('authenticationPrivateKey');
            authKey = authKey !== null ? authKey : "";
            let assertKey = await AsyncStorage.getItem('assertionMethodPrivateKey');
            assertKey = assertKey !== null ? assertKey : "";
            setPrivateKeys({
                authKey: authKey,
                assertKey: assertKey
            })

        } catch (error) {
            Alert.alert("Failed to read local DID.");
        }
    }

    /**
     * Clear local DID
     *
     * @return {Promise<void>}
     */
    const clearLocalDIDInfo = async () => {
        try {
            await AsyncStorage.removeItem('did');
            await AsyncStorage.removeItem('authenticationPrivateKey');
            await AsyncStorage.removeItem('assertionMethodPrivateKey');
            setLocalDID("");
            setPrivateKeys({authKey: '', assertKey: ''});
        } catch (e) {
            Alert.alert("Failed to remove DID.");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <TextInput
                style={styles.input}
                onChangeText={setIdentifier}
                value={identifier}
                placeholder="Your identifier"
            />
            <Separator/>
            <View style={styles.didView}>
                <Text style={styles.label}>DID</Text>
                <Text style={styles.text} selectable={true}>{localDID}</Text>
                <Text style={styles.label}>Authentication Key</Text>
                <Text style={styles.text} selectable={true}>{privateKeys.authKey}</Text>
                <Text style={styles.label}>Assertion Key</Text>
                <Text style={styles.text} selectable={true}>{privateKeys.assertKey}</Text>
            </View>
            <Separator/>
            <View style={styles.buttonView}>
                <Button
                    title="Create DID"
                    onPress={() => issueDID()}
                    disabled={localDID !== ""}
                />
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="Remove DID"
                    color="#dc3545"
                    onPress={() => clearLocalDIDInfo()}
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
    identifierView: {
        margin: 16
    },
    input: {
        height: 40,
        margin: 16,
        borderWidth: 1,
        padding: 10,
    },
    didView: {
        margin: 16
    },
    buttonView: {
        margin: 8
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        borderWidth: 1,
        marginVertical: 5,
        padding: 3
    }
});
