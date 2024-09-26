import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";

export enum MaxesViewReducerActions {
  SET_LIFT,
  SET_WEIGHT,
  SET_STORAGE,
  SET_FAILED_LOAD,
  SET_ADDING_STATE
}

const {
  SET_LIFT,
  SET_WEIGHT,
  SET_STORAGE,
  SET_FAILED_LOAD,
  SET_ADDING_STATE,
} = MaxesViewReducerActions;

interface MaxesViewState {
  lift: string
  weight: string
  dataInStorage: KeyValuePair[] | []
  didLoadingFail: boolean
  isStorageAdding: boolean
}

interface MaxesViewAction {
  type: MaxesViewReducerActions,
  payload: any,
}

export const maxesReducer = (
  state: MaxesViewState, action: MaxesViewAction
) => {

  const { type, payload } = action;

  // destructure 'state' prop here if need to
  // get "old" (i.e. the current values in the component's state object).
  // const { x, y, ... } = state;


  const {
    newLiftName, newWeightAmount, 
    newAddingState, newFailState, newStorageData
  } = payload;
  
  // To help log the reducer's behavior in "dev". 
  // We can set env variable to toggle this off in "prod".
  const returnPreviousState = (stateProp: string, errorMessage?: string)  => {
    console.log(`> MaxesReducer: Failed to update state for: ${stateProp}`);
    if (errorMessage) console.log(`> ${errorMessage}`);
    console.log('> Returning previous state with no changes.');
    return { ...state };
  }


  // Actions the reduces can take to update the current
  // state object tied to the component the reducer is
  // attached to.
  switch (type) {
    
    case SET_LIFT: {

      if (!newLiftName) {
        return returnPreviousState(
          'lift', 'No new state value for -lift- was provided'
        );
      }

      const regex = /^.{3,60}$/; // Lift name - btwn 3 & 60 characters 
      const isValidLiftName = regex.test(newLiftName);

      if (!isValidLiftName) {
        console.error('> MaxesReducer, State Update Error - lift');
        return returnPreviousState(
          'lift', 
          'Failed Validation: A lift name must be between 3 and 60 characters, inclusive'
        );
      }

      return { ...state, lift: newLiftName};
    }

    case SET_WEIGHT: {

      if (!newWeightAmount) {
        return returnPreviousState(
          'weight', 'No new state value for -weight- was provided'
        );
      }
      
      const isValidWeightAmount =
         (+newWeightAmount >= 0 && +newWeightAmount <= 1000);

      if (!isValidWeightAmount) {
        console.error('> MaxesReducer: State Update Error - weight');
        return returnPreviousState(
          'weight', 
          'Failed Validation: Weight must be between 0 and 1000 lbs, inclusive'
        );
      }

      return { ...state, weight: newWeightAmount }; 
    }

    case SET_STORAGE: {
      // Do need to add a check for when the storage data 
      // has not be updated with new content? I'm not sure it 
      // will make a differnce, since, in theory, the same
      // storage values would be rendered to the UI?

      // Check To Add? 
     //  -> If passed storageData == current storageData, return previous state

      if (!newStorageData) {
        return returnPreviousState(
          'dataInStorage', 
          'No new state value for -dataInStorage- was provided'
        );
      }

      return { ...state, dataInStorage: newStorageData }
    }
    
    case SET_FAILED_LOAD: {
      if (!newFailState) {
        return returnPreviousState(
          'didLoadingFail', 
          'No new state value for -didLoadingFail- was provided'
        );
      }

      console.log('> MaxesReducer: Updating `didLoadingFail` state.');
      return { ...state, didLoadingFail: newFailState };
    }

    case SET_ADDING_STATE: {
      if (!newAddingState) {
        return returnPreviousState(
          'isStorageAdding',
          'No new state value for -isStorageAdding- was provided'
        );
      }

      console.log('> MaxesReducer: Updating `isStorageAdding` state.');
      return { ...state, isStorageAdding: newAddingState };
    }

    default: {
      console.log('> MaxesReducer: Default case hit, returning previous state.');
      return { ...state };
    }
  }
}