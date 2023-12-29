import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import DeleteConfirmation from "./DeleteConfirmation";
import { maxrowStyles as styles } from "./Maxrow.styles";

interface MaxrowLift {
  liftName: KeyValuePair;
  handlerToEdit: (lift: string, weight: string | null) => void;
  handlerToGoToPrograms: (event: GestureResponderEvent) => void;
}

const Maxrow: React.FC<MaxrowLift> = ({
  liftName,
  handlerToEdit,
  handlerToGoToPrograms,
}) => {
  const [deletingAnimation, setDeletingAnimation] = useState(
    new Animated.Value(0),
  );

  const handleDeleteTrigger = (itemId: string) => {
    setDeletingAnimation(new Animated.Value(1));
    console.log(itemId);
  };

  /*const animationToDelete = useCallback(() => {
    Animated.timing(deletingAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [deletingAnimation]);*/

  return (
    <View style={styles.maxRow} key={`${liftName[0]} - ${liftName[1]}`}>
      <TouchableOpacity onPress={() => handlerToEdit}>
        <Text style={styles.maxTitle}>
          {liftName[0]}: {liftName[1]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goButton} onPress={handlerToGoToPrograms}>
        <Text style={styles.buttonText}>Generate Program</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTrigger(liftName[0])}
      >
        <FontAwesome5 name="trash" size={15} />
      </TouchableOpacity>
      <DeleteConfirmation />
    </View>
  );
};

export default Maxrow;
