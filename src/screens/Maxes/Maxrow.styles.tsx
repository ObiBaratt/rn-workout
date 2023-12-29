import { StyleSheet } from "react-native";

export const maxrowStyles = StyleSheet.create({
  maxRow: {
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
  maxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    width: "40%",
    textAlign: "left",
  },
  goButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "#7ebff8",
    borderColor: "#0067c1",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  deleteButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    alignSelf: "center",
    justifyContent: "flex-end",
    backgroundColor: "#bfbfbf",
  },
});
