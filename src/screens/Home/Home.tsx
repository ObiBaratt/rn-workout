import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { homeStyles as styles } from "./Home.styles";
import { HomeScreenNavigationProp } from "../../types/navigation";

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Workout Mobile</Text>

      <TouchableOpacity
        key={"oneRmButton"}
        style={styles.button}
        onPress={() => navigation.navigate("OneRm")}
      >
        <Text style={styles.buttonText}>One Rep Max Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity
        key={"programButton"}
        style={styles.button}
        onPress={() => navigation.navigate("Programs")}
      >
        <Text style={styles.buttonText}>Programs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={"maxesButton"}
        style={styles.button}
        onPress={() => navigation.navigate("Maxes")}
      >
        <Text style={styles.buttonText}>Maxes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
