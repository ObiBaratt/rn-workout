import { logger } from "../../utils/logger.util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { MaxesNavigationProp, MaxesRouteProp } from "../../types/navigation";
import { maxesStyles as styles } from "./Maxes.styles";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


const Maxes: React.FC = () => {
  const { navigate } = useNavigation<MaxesNavigationProp>();
  const route = useRoute<MaxesRouteProp>();

  const [lift, setLift] = useState("");
  const [weight, setWeight] = useState("");
  const [keys, setKeys] = useState<readonly KeyValuePair[]>([]);
  const [adding, setAdding] = useState(true);
  const [failedLoad, setFailedLoad] = useState(false);

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

  useEffect(() => {
    getAllKeys();
  }, [adding]);

  const getAllKeys = async () => {
    try {
      setFailedLoad(false);
      const currentKeyEntries = await AsyncStorage.getAllKeys();
      const dataInStorage = await AsyncStorage.multiGet(currentKeyEntries);
      setKeys(dataInStorage);

    } catch (e) {
      setFailedLoad(true);
    }
  };

  const goToPrograms = (weight: number) => 
    navigate("Programs", { calcMax: weight });

  const resetComponentState = () => {
    setLift("");
    setWeight("");
    setAdding(!adding);
    return null;
  }

  const addLift = async () => {
    
    if (lift && weight) {
      try {
        const passedState = { lift, weight };
        const storageKeys = await AsyncStorage.getAllKeys();
        
        if (storageKeys.includes(passedState.lift)) {
          logger.info(
            'Lift already exists in storage. ' + 
            `Refusing to add new lift: ${passedState.lift}`
          );
        }

        else if (!storageKeys.includes(passedState.lift)) {
          logger.info(`Adding new lift to storage: ${passedState.lift}`);
          await AsyncStorage.setItem(lift, weight, resetComponentState);
        }
        else 
          logger.info('Something went wrong when trying to add a new lift.');

      } catch (e) {
         // Else display UI that says the lift cannot be found & return.
        // Optionally, we can throw some custom error & handle it in the catch.
        // 'CannotFindLiftError'.
      }
    }
  };

  const editLift = async () => {
    if (lift && weight) {
      try {
        const passedState = { lift, weight };
        const storageKeys = await AsyncStorage.getAllKeys();
        
        const isMatchingLift = 
          (lift.trim().toLowerCase() === passedState.lift.trim().toLowerCase());
       
        const shouldEdit = isMatchingLift && storageKeys.includes(lift);

        if (shouldEdit) {
          logger.info(`Current keys: ${keys}`);
          logger.info(`Editing values for storage entry - ${lift}`);
          await AsyncStorage.setItem(passedState.lift, weight, resetComponentState);
        
        } else {
         
          logger.info(
            `Failed edit. ` + 
            `Cannot find existing key with name - ${passedState.lift}.`
          ); // Throw an FailedEditOperationError here?
          // In the catch, we'd render UI to retry??
        }

      } catch(e) {
        // TODO: handle the case when bad entry
      }
    }
  }

  const removeLift = async () => {

    if (lift) {
      try {
        const passedState = { lift };
        const storageKeys = await AsyncStorage.getAllKeys();

        if (storageKeys.includes(passedState.lift)) {
          logger.info(`Lift found [${lift}]. Deleting lift from storage.`);
          await AsyncStorage.removeItem(passedState.lift, resetComponentState);
        }
        
        else {
          // Else display UI that says the lift cannot be found & return.
          // Optionally, we can throw some custom error & handle it in the catch.
          // 'CannotFindLiftError'.
          logger.info(
            `Could not a key in current storage with name: ${passedState.lift}`
          );
          logger.info('No delete operation taken.');
        }
        
      } catch (e) {
        // saving error should add retry option
        
        /*
          if (error instanceof CannotFindLiftError) {
            // render UI to state the lift cannot be found
            // and to try again.
          }
        */
      }
    }
  };

  const goToEditScreen = (lift: string, weight: string | null) => {
    setLift(lift);
    setWeight(weight || "");
    setAdding(!adding);
  };
  
  const shouldShowMaxesList = keys.length > 0 && !adding;

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
          { shouldShowMaxesList ? (
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
                <TouchableOpacity style={styles.button} onPress={editLift}>
                  <Text>Edit Lift</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={addLift}>
                  <Text>Add Lift</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={removeLift}>
                  <Text>Delete Lift</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.goBackToMaxesButton}
                  onPress={() => setAdding(!adding)}
                >
                  <Text>Back To Maxes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ): (
            <View style={styles.container}>
              {keys.map((key) => {

                const liftName = key[0];
                const weightInLbs = key[1];

                return (
                  <View 
                    key={`${liftName} - ${weightInLbs}`}
                    style={styles.maxList} 
                  >
                  <Text
                    style={styles.title}
                    onPress={() => goToEditScreen(liftName, weightInLbs)}
                  >
                    {liftName}: {weightInLbs}
                  </Text>
                  <TouchableOpacity
                    style={styles.goButton}
                    onPress={() => goToPrograms(Number(weightInLbs) || 0)}
                  >
                    <Text>Gen Program</Text>
                  </TouchableOpacity>
                </View>
                )
              })}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setAdding(!adding)}
              >
                <Text>Add New Max</Text>
              </TouchableOpacity>
            </View>
          )
        }
        </>
      )}
    </ScrollView>
  );
};

export default Maxes;