import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import React, { useState } from "react";
import { Animated } from "react-native";

const DeleteButton: React.FC = () => {
  const deletedLifts = keys.filter((key) => key[0] !== lift);
  const foundLifts = deletedLifts.find((item: any) => item === lift);

  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteArr, setDeleteArr] = useState<readonly KeyValuePair[]>([]);
  const [deletingAnimation] = useState(new Animated.Value(0));

  const animationToDelete = useCallback(() => {
    Animated.timing(deletingAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [deletingAnimation]);

  const handleDeleteTrigger = (lift: string) => {
    const foundLift =
      foundLifts && foundLifts[0] === lift ? foundLifts : undefined;
    if (foundLift && foundLift[0] === lift) {
      setDeleting(true);
      setDeleteArr(foundLift);
    }
    animationToDelete();

    console.log(`found lifts: ${foundLifts}`);
    console.log(`deleted lifts: ${deletedLifts}`);
  };

  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem(lift, () => {
        setDeleting(true);
        return null;
      });
    } catch (e) {
      // saving error should add retry option
    }
  };

  return (
    <Animated.View style={[styles.deleteItem, { opacity: deletingAnimation }]}>
      <Text style={styles.deleteItem}>
        Are you sure you want to delete {deleteArr}?
      </Text>
    </Animated.View>
  );
};

export default DeleteButton;
