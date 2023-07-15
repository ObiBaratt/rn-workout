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

import { programsStyles as styles } from "./Programs.styles";
import {
  NuckolsDeadlift,
  NuckolsPress,
  NuckolsSquat,
  SquatOverload,
} from "../../utils/basicPrograms";

const Programs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    name: string;
    fxn: (oneRm: number) => [number, number | string][][];
  } | null>(null);
  const [max, setMax] = useState<number>(0);
  const [animation] = useState(new Animated.Value(0));
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [program, setProgram] = useState<[number, number | string][][] | null>(
    null,
  );

  const animateTable = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const options = [
    { name: "Squat Overload", fxn: SquatOverload },
    { name: "Greg Nuckol's Press", fxn: NuckolsPress },
    { name: "Greg Nuckol's Deadlift", fxn: NuckolsDeadlift },
    { name: "Greg Nuckol's Squat", fxn: NuckolsSquat },
  ];

  const handleSelectOption = (option: {
    name: string;
    fxn: (oneRm: number) => [number, number | string][][];
  }) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!max || !selectedValue) {
    } else {
      setProgram(selectedValue.fxn(max));
    }
  }, [max, selectedValue]);

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      contentContainerStyle={[styles.container]}
    >
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Text style={styles.titleText}>
          {selectedValue ? selectedValue.name : "Select a program"}
        </Text>
      </TouchableOpacity>

      {selectedValue && (
        <TextInput
          style={styles.input}
          onChangeText={(text: string) => setMax(parseInt(text))}
          value={max > 0 ? max.toString() : ""}
          keyboardType="numeric"
          placeholder="Enter Your One Rep Max"
          onBlur={() => {
            Keyboard.dismiss();
            animateTable();
            setIsInputFocused(false);
          }}
          onFocus={() => setIsInputFocused(true)}
        />
      )}

      {isOpen && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <ScrollView
            style={styles.modalContainer}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 100,
              paddingBottom: 100,
            }}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={option.name}
                onPress={() => handleSelectOption(option)}
              >
                <Text style={styles.optionStyle}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </TouchableOpacity>
      )}

      {!isInputFocused && max && program
        ? program.map((data, i) => (
            <View key={i}>
              <Text style={styles.tableTitle}>Day {i + 1}</Text>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.bold]}>Set</Text>
                <Text style={[styles.tableCell, styles.bold]}>Weight</Text>
                <Text style={[styles.tableCell, styles.bold]}>Reps</Text>
              </View>
              {data.map(
                ([weight, reps]: [number, number | string], index: number) => (
                  <Animated.View
                    style={{
                      ...styles.tableRow,
                      opacity: animation,
                      transform: [
                        {
                          translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }),
                        },
                      ],
                    }}
                    key={index}
                  >
                    <Text style={styles.tableCell}>{index + 1}</Text>
                    <Text style={styles.tableCell}>{weight}</Text>
                    <Text style={styles.tableCell}>{reps}</Text>
                  </Animated.View>
                ),
              )}
            </View>
          ))
        : null}
    </ScrollView>
  );
};

export default Programs;
