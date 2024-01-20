//   const [keys, setKeys] = useState<readonly KeyValuePair[]>([]);

export enum MaxesReducerActions {
  SET_WEIGHT = 'set-weight',
  SET_LIFT = 'set-lift',
  SET_LOAD_STATE = 'set-load-state',
  STORAGE_UPDATE_KEYS = 'set-storage-keys',
  STORAGE_TOGGLE_ADDING_STATE = 'set-storage-adding-state',
}

const { 
  SET_LIFT, 
  SET_WEIGHT, 
  SET_LOAD_STATE,
  STORAGE_UPDATE_KEYS,
  STORAGE_TOGGLE_ADDING_STATE
} = MaxesReducerActions;

// TODO: Add better typechecking here
interface Action {
  type: MaxesReducerActions
  payload: any
}

interface MaxesViewState {
  lift: string
  weight: string
  didFailLoad: boolean,
  storageAddingState: boolean
  currentKeysInStorage: any,
  error: string | null
}

export function maxesReducer(state: MaxesViewState, action: Action) {

  const { type, payload } = action;
  const { lift: oldLiftName, weight: oldWeightAmount } = state;
  const { 
    newLiftName, 
    newWeightAmount, 
    newLoadState,
    newAddingState,
    newKeysToSet
  } = payload;

  switch(type) {

    case SET_LIFT: {
      const isValidStringLength = '/^.{3,60}$/';
      const hasError = isValidStringLength;

      return {
        ...state,
        lift: isValidStringLength ? oldLiftName : newLiftName,
        error: 
          hasError ? 
            'A lift name must be between 3 and 60 character.' : ''
      }
    }

    case SET_WEIGHT: {
      const weightNum = Number(oldWeightAmount);
      const hasError = (weightNum < 0 || weightNum > 1000);
      
      return {
        ...state,
        weight: hasError ? oldWeightAmount : newWeightAmount,
        error: 
          hasError ? 
            'Weight cannot be less than 0 or greater than 1000 lbs.' : ''
      }
    }

    case SET_LOAD_STATE:
      return { ...state, didFailLoad: newLoadState };

    case STORAGE_UPDATE_KEYS: 
      return { ...state, currentKeysInStorage: newKeysToSet }

    case STORAGE_TOGGLE_ADDING_STATE: 
      return { ...state, storageAddingState: newAddingState };
    
    default: {
      console.error('> Failed to dispatch action.type in maxesReducer: ');
      console.log(
        '> Failed to update state in maxes reudcer. ' + 
        'Returning the old state with no modifications.'
      );
      return { ...state };
    }
  }
}