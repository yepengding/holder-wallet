import {env} from "../config/env";
import {Alert} from "react-native";
import axios from "axios";

export const createDID = (method, methodIdentifier) => {
    const mutationData = {
        query:
            `mutation CreateDID($createDidReq: CreateDIDReq!) {
                    createDID(createDidReq: $createDidReq) {
                        did
                        authenticationPrivateKey
                        assertionMethodPrivateKey
                    }
                }`,
        variables: `{
                          "createDidReq": {
                            "method": "${method}",
                            "methodIdentifier": "${methodIdentifier}"
                          }
                        }`
    };

    return axios.post(`${env.vdr.endpoint}/graphql/`, mutationData, {timeout: 5000})
        .then(res => res.data)
        .then(res => {
            if (!res.errors) {
                return res.data.createDID;
            } else {
                Alert.alert(res.errors[0].message);
                return null;
            }
        })
        .catch((error) => {
            console.error(error);
            Alert.alert("Failed to connect to the verifiable data registry.");
            throw Error;
        });
}
