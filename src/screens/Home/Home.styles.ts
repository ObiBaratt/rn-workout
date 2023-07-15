import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText: {
    marginTop: height * 0.3,
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    marginTop: 20,
    padding: 10,
    width: "80%",
    alignItems: "center",
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
