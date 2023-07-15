import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { homeStyles as styles } from "./Home.styles";
import { HomeScreenNavigationProp } from "../../types/navigation";

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
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
    </View>
  );
};

export default Home;
