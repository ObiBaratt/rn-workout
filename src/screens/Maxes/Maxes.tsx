import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { MaxesNavigationProp, MaxesRouteProp } from "../../types/navigation";
import { maxesStyles as styles } from "./Maxes.styles";

const Maxes: React.FC = () => {
  const navigation = useNavigation<MaxesNavigationProp>();
  const route = useRoute<MaxesRouteProp>();
  const [lift, setLift] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [keys, setKeys] = useState<readonly KeyValuePair[]>([]);
  const [adding, setAdding] = useState<boolean>(false);
  const [failedLoad, setFailedLoad] = useState<boolean>(false);

  useEffect(() => {
    const calcMax = route.params?.calcMax;
    const adding = route.params?.adding;
    if (adding) {
      setAdding(true);
    }
    if (calcMax) {
      setWeight(calcMax.toString());
    }
  }, [route.params]);

  const getAllKeys = async () => {
    try {
      setFailedLoad(false);
      const asyncKeys = await AsyncStorage.getAllKeys();
      const res = await AsyncStorage.multiGet(asyncKeys);
      setKeys(res);
    } catch (e) {
      setFailedLoad(true);
    }
  };
  useEffect(() => {
    getAllKeys();
  }, [adding]);

  const goToPrograms = (weight: number) => {
    navigation.navigate("Programs", {
      calcMax: weight,
    });
  };

  const handleSave = async () => {
    if (lift && weight) {
      try {
        await AsyncStorage.setItem(lift, weight, () => {
          setLift("");
          setWeight("");
          setAdding(!adding);
          return null;
        });
      } catch (e) {
        // saving error should add retry option
      }
    }
  };

  const handleEdit = (lift: string, weight: string | null) => {
    setLift(lift);
    setWeight(weight || "");
    setAdding(!adding);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {failedLoad ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={getAllKeys}>
            <Text style={styles.title}>Failed to load data. Retry?</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>Maxes</Text>
          </View>
          {!adding ? (
            <View style={styles.container}>
              {keys.length > 0 ? (
                /* TODO: fix this logic, maybe? Need to be able to delete item to test */
                keys.map((key) => (
                  <View style={styles.maxList} key={`${key[0]} - ${key[1]}`}>
                    <Text
                      style={styles.maxTitle}
                      onPress={() => handleEdit(key[0], key[1])}
                    >
                      {key[0]}: {key[1]}
                    </Text>
                    <TouchableOpacity
                      style={styles.goButton}
                      onPress={() => goToPrograms(Number(key[1]) || 0)}
                    >
                      <Text style={styles.buttonText}>Generate Program</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text>No Maxes Available</Text>
              )}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setAdding(!adding)}
              >
                <Text style={styles.buttonText}>Add New Max</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <TextInput
                onChangeText={setLift}
                style={styles.input}
                placeholder="Lift"
                placeholderTextColor={"black"}
                value={lift}
              />
              <TextInput
                onChangeText={setWeight}
                style={styles.input}
                keyboardType="numeric"
                placeholder="Weight"
                placeholderTextColor={"black"}
                value={weight}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setAdding(!adding)}
                >
                  <Text>Maxes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Maxes;
