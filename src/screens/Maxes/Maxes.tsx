import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState, useReducer } from "react";
import { MaxesNavigationProp, MaxesRouteProp } from "../../types/navigation";
import { maxesStyles as styles } from "./Maxes.styles";
import Button from "../../ui/components/buttons/Button";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import OneRepMaxCard from "../../ui/components/cards/LiftEntryCard";
import { maxesReducer, MaxesReducerActions } from "../../lib/reducers/maxes-view.reducer";

const {
  SET_LIFT, 
  SET_WEIGHT, 
  SET_LOAD_STATE,
  STORAGE_UPDATE_KEYS,
  STORAGE_TOGGLE_ADDING_STATE,
} = MaxesReducerActions;

const Maxes: React.FC = () => {
  const { navigate } = useNavigation<MaxesNavigationProp>();
  const route = useRoute<MaxesRouteProp>();
  // const keys = useStorage(fetch: StorageGet.AllKeys/SingleKey, '...')

  // Create useStorage() hook to acquire storage anywhere in app
  const [keys, setKeys] = useState<readonly KeyValuePair[]>([]);

  const [state, dispatch] = useReducer(maxesReducer, {
    lift: '',
    weight: '',
    didFailLoad: false,
    storageAddingState: true,
    currentKeysInStorage: [] as KeyValuePair[],
    error: '',
  });

  const { lift, weight, didFailLoad, storageAddingState } = state;
  
  // Gets the route parameters when the view mounts.
  useEffect(() => {
    const calcMax = route.params?.calcMax;
    const adding = route.params?.adding;

    if (adding) 
      dispatch({ type: STORAGE_TOGGLE_ADDING_STATE, payload: true });
    
    if (calcMax)
      dispatch({ type: SET_WEIGHT, payload: calcMax.toString() });

  }, [route.params]);

  const getAllKeys = async () => {
    try {
      dispatch({ type: SET_LOAD_STATE, payload: false });

      const allKeys = await AsyncStorage.getAllKeys();
      const dataFromStorage = await AsyncStorage.multiGet(allKeys);

      dispatch({ type: STORAGE_UPDATE_KEYS, payload: dataFromStorage });

    } catch (error) {
      console.error('Failed Storage Fetch: %s', error);
      console.log(
        '> Unable to fetch dasta from AsyncStorage.' +
        'Problem start on Maxes screen.'
      );
      dispatch({ type: SET_LOAD_STATE, payload: true });
    }
  };

  // Fetch from storage when the component mounts.
  useEffect(() => { getAllKeys() }, [storageAddingState]);

  const goToPrograms = (weight: number) => {
    navigate('Programs', { calcMax: weight });
  };

  const toggleAddingState = () => {
    dispatch({ 
      type: STORAGE_TOGGLE_ADDING_STATE, 
      payload: !storageAddingState 
    });
  }
  
  /*
  * 'CREATES/SAVES' a new key:value pair inside the storage.
  *
  * Fires off reducer dispatch actions to sequentially
  * update the current `state` object tied to the component.
  */
  const handleSave = async () => {
    if (lift && weight) {
      try {
        await AsyncStorage.setItem(lift, weight, () => {
          dispatch({ type: SET_LIFT, payload: '' });
          dispatch({ type: SET_WEIGHT, payload: '' });
          toggleAddingState();
          return null;
        });
      } catch (e) {
        // saving error should add retry option
      }
    }
  };

  /*
  * 'DELETES' an existing key:value pair from storage.
  *
  * Fires off reducer dispatch actions to sequentially
  * update the current `state` object tied to the component.
  */
  const handleDelete = async () => {
    await AsyncStorage.removeItem(lift, () => {
      dispatch({ type: SET_LIFT, payload: '' });
      dispatch({ type: SET_WEIGHT, payload: '' });
      toggleAddingState();
    })
    .catch((error) => {
      console.error('Storage Removal Failure: ', error);
      console.log(`> Failed to remove ${lift} from storage`);
    })
    .then(() => 
      console.log(`> Successfully removed ${lift} from storage`)
    );
  }

  /*
  * 'UPDATES' an existing key:value pair from storage.
  *
  * Fires off reducer dispatch actions to sequentially
  * update the current `state` object tied to the component.
  */
  const handleEdit = (lift: string, weight: string | null) => {
    dispatch({ type: SET_LIFT, payload: lift });
    dispatch({ type: SET_WEIGHT, payload: weight ?? ''});
    toggleAddingState();
  };

  // Only render maxes list when storage is not adding AND there are items.
  const showMaxesList = keys.length > 0 && !storageAddingState;

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {didFailLoad ? 
        (<RetryButton styles={styles} onPress={getAllKeys} />) : 
        (
          <>
            {showMaxesList ? (
              // Display controls to enter a new max weight.
              <View style={styles.container}>  
                <TextInput
                  style={styles.input}
                  placeholder="Lift"
                  value={lift}
                  placeholderTextColor={"black"}
                  onChangeText={(text: string) => 
                    dispatch({ type: SET_LIFT, payload: text})
                  }
                />
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Weight"
                  value={weight}
                  placeholderTextColor={"black"}
                  onChangeText={(text: string) => 
                    dispatch({ type: SET_WEIGHT, payload: text })
                  }
                />

                <View style={styles.buttonContainer}>
                  <Button 
                    label='Save' styles={styles} 
                    onPress={handleSave} 
                  />
                  <Button 
                    label='Delete' styles={styles} 
                    onPress={handleDelete} 
                  />
                  <Button 
                    label='Maxes' styles={styles}
                    onPress={() => toggleAddingState()} 
                  />
                </View>
              </View>
            ) : (
              // List of saved maxes from storage.
              <View style={styles.container}>
                {keys.map((key) => 
                  <OneRepMaxCard 
                    key={`${key[0]} - ${key[1]}`}
                    styles={styles}
                    storageKey={key}
                    edit={handleEdit}
                    moveTo={goToPrograms}
                  />
                )}
                <Button
                  label='Add New Max' styles={styles}
                  onPress={toggleAddingState} 
                />
              </View>
            )}
          </>
        )
      }
    </ScrollView>
  );
};

export default Maxes;

interface RetryButtonProps { 
  styles: any, 
  onPress: () => void 
}

const RetryButton = ({ styles, onPress}: RetryButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.title}>
          Failed to load data. Retry?
        </Text>
      </TouchableOpacity>
    </View>
  );
}