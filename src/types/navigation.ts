import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  OneRm: undefined;
  Programs: { calcMax: number } | undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type ProgramNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Programs"
>;

export type OneRmNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OneRm"
>;

export type ProgramRouteProp = RouteProp<RootStackParamList, "Programs">;
