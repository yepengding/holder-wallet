/**
 * App Entry Point
 *
 * @author Yepeng Ding
 */

import {HomeScreen} from "./screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DIDScreen} from "./screens/DIDScreen";
import {CredentialScreen} from "./screens/CredentialScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                <Stack.Screen name="DID" component={DIDScreen} />
                <Stack.Screen name="Credential" component={CredentialScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

