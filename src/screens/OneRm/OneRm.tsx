import React, { useState } from "react";
import {
  Animated,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { oneRmstyles as styles } from "./OneRm.styles";
import { calcOneRm, maxReps } from "../../utils/calc1rm";

const OneRm: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [oneRm, setOneRm] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [calcAnimation] = useState(new Animated.Value(0));
  const [mapAnimations, setMapAnimations] = useState(
    Object.keys(maxReps).map(() => new Animated.Value(0)),
  );

  const handleCalculate = () => {
    Keyboard.dismiss();
    if (weight && reps) {
      const oneRepMax = calcOneRm(parseInt(weight), parseInt(reps));
      setOneRm(oneRepMax);
      Animated.parallel([
        Animated.timing(calcAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        ...mapAnimations.map((anim, index) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            delay: index * 50,
            useNativeDriver: true,
          }),
        ),
      ]).start();
      setIsCalculated(true);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      contentContainerStyle={[
        styles.container,
        isCalculated
          ? { justifyContent: "flex-start" }
          : { justifyContent: "center" },
      ]}
    >
      <Animated.View
        style={{
          transform: [
            {
              translateY: calcAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0],
              }),
            },
          ],
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          keyboardType="numeric"
          placeholder="Enter Weight"
        />
        <TextInput
          style={styles.input}
          onChangeText={setReps}
          value={reps}
          keyboardType="numeric"
          placeholder="Enter Reps"
        />
        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </Animated.View>

      {oneRm > 0 ? (
        <View>
          <Text style={styles.title}>One Rep Max: {oneRm}</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.bold]}>Reps</Text>
              <Text style={[styles.tableCell, styles.bold]}>Weight</Text>
              <Text style={[styles.tableCell, styles.bold]}>Percent</Text>
            </View>
            {Object.entries(maxReps).map(([rep, percent], index) => {
              const rowAnim = mapAnimations[index];
              return (
                <Animated.View
                  style={{
                    ...styles.tableRow,
                    opacity: rowAnim,
                    transform: [
                      {
                        translateY: rowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  }}
                  key={rep}
                >
                  <Text style={styles.tableCell}>{rep}</Text>
                  <Text style={styles.tableCell}>
                    {Math.floor(oneRm * percent)}
                  </Text>
                  <Text style={styles.tableCell}>
                    {Math.floor(percent * 100)}%
                  </Text>
                </Animated.View>
              );
            })}
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default OneRm;
