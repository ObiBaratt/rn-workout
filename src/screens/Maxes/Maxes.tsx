import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useReducer, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { MaxesViewReducerActions, maxesReducer } from "../../lib/reducers/maxes.reducer";
import { MaxesNavigationProp, MaxesRouteProp } from "../../types/navigation";
import Button from "../../ui/components/buttons/Button";
import RetryButton from "../../ui/components/buttons/RetryButton";
import OneRepMaxCard from "../../ui/components/cards/OneRepMaxCard";
import { maxesStyles as styles } from "./Maxes.styles";

const {
  SET_LIFT, 
  SET_WEIGHT, 
  SET_FAILED_LOAD,
  SET_STORAGE,
  SET_ADDING_STATE
} = MaxesViewReducerActions;

const Maxes: React.FC = () => {
  const { navigate } = useNavigation<MaxesNavigationProp>();
  const route = useRoute<MaxesRouteProp>();
  // const keys = useStorage(fetch: StorageGet.AllKeys/SingleKey, '...')

  // Create useStorage() hook to acquire storage anywhere in app
  const [keys, setKeys] = useState<readonly KeyValuePair[]>([]);

  const [state, dispatch] = useReducer(maxesReducer, {
    lift: '',
    weight: '',
    dataInStorage: [],
    didLoadingFail: false,
    isStorageAdding: true,
  });

  const { 
    lift, weight, dataInStorage,
    didLoadingFail, isStorageAdding,  
  } = state;
  
  // Get route params when component mounts.
  useEffect(() => {
    const calcMax = route.params?.calcMax;
    const adding = route.params?.adding;

    if (adding) {
      // to sync with 'payload' names in the maxesReducer func.
      const newAddingState = true; 
      dispatch({ type: SET_ADDING_STATE, payload: newAddingState });
    }
    
    if (calcMax) {
      // to sync with 'payload' names in the maxesReducer func.
      const newWeightAmount = calcMax.toString(); 
      dispatch({ type: SET_WEIGHT, payload: newWeightAmount });
    }

  }, [route.params]);

  const getCurrentStorageData = async () => {
    let newFailState;

    try {
      newFailState = false;
      dispatch({ type: SET_FAILED_LOAD, payload: newFailState });

      const keyPairs = await AsyncStorage.getAllKeys();
      const newStorageData = await AsyncStorage.multiGet(keyPairs);

      dispatch({ type: SET_STORAGE, payload: newStorageData });

    } catch (error) {
      console.error('Failed Storage Fetch: %s', error);
      newFailState = true;
      dispatch({ type: SET_FAILED_LOAD, payload: newFailState });
    }
  };

  // Fetch from storage when the component mounts.
  useEffect(() => { getCurrentStorageData() }, [isStorageAdding]);

  const goToPrograms = (weight: number) => 
    navigate('Programs', { calcMax: weight });

  const toggleAddingState = () => {
    const newAddingState = !isStorageAdding;
    dispatch({ type: SET_ADDING_STATE, payload: newAddingState });
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
  * Fires off `resetLiftAndWeightState` callback if DB operation
  * succeeds.
  */
  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem(lift, () => {
          const newLiftName = '';
          const newWeightAmount = '';
          dispatch({ type: SET_LIFT, payload: newLiftName });
          dispatch({ type: SET_WEIGHT, payload: newWeightAmount });
          toggleAddingState();
        }
      );
    }
    catch(error) {
      console.error('Storage Removal Failure: ', error);
    }
  }

 /*
  * 'Updates' an existing key:value pair from storage.
  *
  * Fires off `resetLiftAndWeightState` callback if DB operation
  * succeeds.
  */
  const handleEdit = (lift: string, weight: string | null) => {
    // To sync with 'payload' names in maxesReducer;
    const newLiftName = lift;
    const newWeightAmount = weight ?? '';

    dispatch({ type: SET_LIFT, payload: newLiftName });
    dispatch({ type: SET_WEIGHT, payload: newWeightAmount ?? ''});
    toggleAddingState();
  };

  // Only render maxes list when storage is not adding AND there
  // items in storage.
  const showMaxesList = keys.length > 0 && !isStorageAdding;

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {didLoadingFail ? 
        (<RetryButton styles={styles} onPress={getCurrentStorageData} />) : 
        (<>
          {showMaxesList ? (
            <MaxesList
              styles={styles}
              dataToRender={dataInStorage}
              editFn={handleEdit}
              goToFn={goToPrograms}
              toggleAddFn={toggleAddingState}
            />
          ) : (
            <MaxesInputControls 
              styles={styles}
              lift={lift}
              weight={weight}
              dispatch={dispatch}
              saveFn={handleSave}
              deleteFn={handleDelete}
              toggleAddFn={toggleAddingState}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Maxes;



// NOTE: Can be placed back into main component.
// Separated to help understand what was going
// on in the main view.
interface MaxesListProps {
  styles: any,
  dataToRender: KeyValuePair[]
  editFn: (lift: string, weight: string | null) => void
  goToFn: (weight: number) => void
  toggleAddFn: () => void
}

const MaxesList = ({
  styles,
  dataToRender,
  editFn,
  goToFn,
  toggleAddFn
}: MaxesListProps) => {
  return (
    <View style={styles.container}>
      {dataToRender?.map((key) => 
        <OneRepMaxCard 
          key={`${key[0]} - ${key[1]}`}
          styles={styles}
          storageKey={key}
          edit={editFn}
          moveTo={goToFn}
        />
      )}
      <Button 
        label='Add New Max' 
        styles={styles} 
        onPress={toggleAddFn} 
      />
    </View>
  );
}


// NOTE: Can be placed back into main component.
// Separated to help understand what was going
// on in the main view.
interface MaxesInputControlsProps {
  styles: any
  lift: string
  weight: string
  dispatch: any
  saveFn: () => void
  deleteFn: () => void
  toggleAddFn: () => void
}

const MaxesInputControls = ({
  styles, lift, weight, dispatch,
  saveFn, deleteFn, toggleAddFn,
} : MaxesInputControlsProps) => {
  return (
    <View style={styles.container}>  
      <TextInput
        style={styles.input}
        placeholder="Lift"
        value={lift}
        placeholderTextColor="black"
        onChangeText={(text) => {
          const newLiftName = text;
          dispatch({ type: SET_LIFT, payload: newLiftName});
        }}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Weight"
        value={weight}
        placeholderTextColor="black"
        onChangeText={(text) => {
          const newWeightAmount = text;
          dispatch({ type: SET_WEIGHT, payload: newWeightAmount });
        }}
      />
      <View style={styles.buttonContainer}>
        <Button label='Save' styles={styles} onPress={saveFn} />
        <Button label='Delete' styles={styles} onPress={deleteFn} />
        <Button 
          label='Maxes' styles={styles}
          onPress={() => toggleAddFn()} 
        />
      </View>
   </View>
  );
}