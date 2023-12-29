import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Animated } from "react-native";

interface Item {
  id: string;
  lift: string;
}

interface ConfirmationState {
  [itemID: string]: boolean;
}

const useDeleteConfirmation = (itemsKey: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [confirmation, setConfirmation] = useState<ConfirmationState>({});
  const [deletingAnimation, setDeletingAnimation] = useState(
    new Animated.Value(0),
  );

  const fetchItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(itemsKey);
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
        const confirmationState: ConfirmationState = {};
        JSON.parse(storedItems).forEach((item: Item) => {
          confirmationState[item.id] = false;
        });
        setConfirmation(confirmationState);
      }
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [itemsKey]);

  const handleDeleteTrigger = (itemId: string) => {
    setDeletingAnimation(new Animated.Value(1));
    console.log(itemId);
  };

  const handleDelete = async (itemId: string) => {
    if (confirmation[itemId]) {
      try {
        const updatedItems = items.filter((item) => item.id !== itemId);
        await AsyncStorage.setItem(itemsKey, JSON.stringify(updatedItems));
        setItems(updatedItems);
        setConfirmation((prevState) => {
          const newState = { ...prevState };
          delete newState[itemId];
          return newState;
        });
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    } else {
      setConfirmation((prevState) => ({
        ...prevState,
        [itemId]: true,
      }));
    }
  };

  const animationToDelete = useCallback(() => {
    Animated.timing(deletingAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [deletingAnimation]);

  return {
    items,
    confirmation,
    handleDelete,
    animationToDelete,
    deletingAnimation,
    handleDeleteTrigger,
  };
};

export default useDeleteConfirmation;
