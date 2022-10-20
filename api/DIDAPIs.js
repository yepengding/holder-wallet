import {env} from "../config/env";
import {Alert} from "react-native";

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

    return fetch(`${env.vdr.endpoint}/graphql/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mutationData),
    })
        .then(res => res.json())
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
        });
}
