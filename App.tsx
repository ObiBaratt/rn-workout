import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Home from "./src/ui/screens/Home/Home";
import Maxes from "./src/ui/screens/Maxes/Maxes";
import OneRm from "./src/ui/screens/OneRm/OneRm";
import Programs from "./src/ui/screens/Programs/Programs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OneRm" component={OneRm} />
        <Stack.Screen name="Programs" component={Programs} />
        <Stack.Screen name="Maxes" component={Maxes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
