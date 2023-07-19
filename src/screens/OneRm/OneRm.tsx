import React, { useEffect, useState } from "react";
import {
  Animated,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { OneRmNavigationProp } from "../../types/navigation";
import { calcOneRm, maxReps } from "../../utils/calc1rm";
import { oneRmstyles as styles } from "./OneRm.styles";

type OneRmProps = {
  navigation: OneRmNavigationProp;
};

const OneRm: React.FC<OneRmProps> = ({ navigation }) => {
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [oneRm, setOneRm] = useState<number>(0);
  const [warnWeight, setWarnWeight] = useState<boolean>(false);
  const [warnReps, setWarnReps] = useState<boolean>(false);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [calcAnimation] = useState(new Animated.Value(0));
  const [mapAnimations, setMapAnimations] = useState(
    Object.keys(maxReps).map(() => new Animated.Value(0)),
  );

  useEffect(() => {
    if (weight && !reps) {
      setWarnReps(true);
    } else if (!weight && reps) {
      setWarnWeight(true);
    } else if (!weight && !reps) {
      setWarnWeight(false);
      setWarnWeight(false);
    }
  }, [weight, reps]);

  const handleCalculate = () => {
    Keyboard.dismiss();
    if (weight && reps) {
      setWarnReps(false);
      setWarnWeight(false);
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

  const goToPrograms = () => {
    navigation.navigate("Programs", {
      calcMax: oneRm,
    });
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
      <Text style={styles.title}>One Rep Max Calculator</Text>
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
          style={
            warnWeight ? { ...styles.input, ...styles.inputWarn } : styles.input
          }
          onChangeText={setWeight}
          value={weight}
          keyboardType="numeric"
          placeholder="Enter Weight"
          placeholderTextColor={warnWeight ? "red" : "black"}
          onBlur={handleCalculate}
        />
        <TextInput
          style={
            warnReps ? { ...styles.input, ...styles.inputWarn } : styles.input
          }
          onChangeText={setReps}
          value={reps}
          keyboardType="numeric"
          placeholder="Enter Reps"
          placeholderTextColor={warnReps ? "red" : "black"}
          onBlur={handleCalculate}
        />
      </Animated.View>

      {oneRm > 0 ? (
        <View>
          <View>
            <Text style={styles.title}>One Rep Max: {oneRm}</Text>
            <TouchableOpacity
              style={styles.verticalSpaced}
              onPress={goToPrograms}
            >
              <Text style={styles.generateProgram}>Generate a Program</Text>
            </TouchableOpacity>
          </View>

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
