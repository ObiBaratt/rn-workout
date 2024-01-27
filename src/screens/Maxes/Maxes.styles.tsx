import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const maxesStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  },
  input: {
    height: height * 0.07,
    marginVertical: 12,
    borderWidth: 1.5,
    borderRadius: 2,
    textAlign: "center",
    width: '100%',
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
    flexDirection: "column",
    width: "100%",
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
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
  goBackToMaxesButton: {
    marginTop: 64,
    alignItems: "center",
    borderWidth: 0,
    fontWeight: '900'
  },
  maxList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
});
