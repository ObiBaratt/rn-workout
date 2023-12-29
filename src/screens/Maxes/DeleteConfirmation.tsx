import React from "react";
import { Animated, Text, TouchableOpacity } from "react-native";

import { deleteConfirmationStyles as styles } from "./DeleteConfirmation.styles";
import useDeleteConfirmation from "./useDeleteConfirmation";

// custom hook to handle fetching of data and manipulation of data or
// define a delete lift function in Maxes, pass key array to delete button, pass function as delete button
// redux toolkit over redux

const DeleteConfirmation: React.FC = () => {
  const { handleDelete, deletingAnimation } = useDeleteConfirmation("ItemsKey"); //still need to pass in lift here?

  return (
    <Animated.View style={[styles.deleteItem, { opacity: deletingAnimation }]}>
      <Text style={styles.deleteItem}>Are you sure you want to delete?</Text>
      <TouchableOpacity onPress={() => handleDelete()}>
        {/* still need to pass in lift here */}
        <Text>Yes</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DeleteConfirmation;
