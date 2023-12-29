import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const maxesStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
    width: "40%",
    textAlign: "center",
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
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: "#7ebff8",
    borderColor: "#0067c1",
    borderWidth: 3,
    fontSize: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  maxList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    marginBottom: 10,
    borderColor: "#0067c1",
    borderBottomWidth: 2,
    paddingTop: 5,
    paddingBottom: 15,
  },
});
