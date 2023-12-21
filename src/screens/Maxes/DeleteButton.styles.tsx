import { StyleSheet } from "react-native";

export const deleteButtonStyles = StyleSheet.create({
  deleteButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    alignSelf: "center",
    justifyContent: "flex-end",
    backgroundColor: "#bfbfbf",
  },
  deleteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    borderColor: "#0067c1",
    borderBottomWidth: 2,
    paddingTop: 5,
    paddingBottom: 15,
  },
});
