import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Home from "./src/screens/Home/Home";
import OneRm from "./src/screens/OneRm/OneRm";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OneRm" component={OneRm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
