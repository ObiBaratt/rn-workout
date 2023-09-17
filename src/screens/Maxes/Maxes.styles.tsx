import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const maxesStyles = StyleSheet.create({
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
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    marginTop: 20,
    padding: 10,
    width: "25%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  goButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  maxList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
});
