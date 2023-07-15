import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

export const programsStyles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  tableTitle: {
    fontSize: 16,
    paddingVertical: 20,
    fontWeight: "700",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    width: width * 0.6,
    maxHeight: height * 0.3,
    alignSelf: "center",
    backgroundColor: "red",
    marginTop: (height - height * 0.3) / 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    maxHeight: height * 0.7,
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "blue",
  },
  buttonText: {
    color: "blue",
  },
  optionStyle: {
    fontSize: 32,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginVertical: 5,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 8,
    textAlign: "center",
  },
  table: {
    flexDirection: "column",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: "#ddd",
    width: width * 0.8,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});
