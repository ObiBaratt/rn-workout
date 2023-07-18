import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const oneRmstyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: height * 0.07,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 8,
    textAlign: "center",
    width: width * 0.8,
  },
  inputWarn: {
    borderColor: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
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
  warningRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: width * 0.8,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  warningText: {
    color: "red",
  },
});
