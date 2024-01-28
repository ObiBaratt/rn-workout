import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  OneRm: undefined;
  Programs: { calcMax: number } | undefined;
  Maxes: { calcMax: number; adding: boolean } | undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type MaxesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Maxes"
>;

export type ProgramNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Programs"
>;

export type OneRmNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OneRm"
>;

export type MaxesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Maxes"
>;

export type ProgramRouteProp = RouteProp<RootStackParamList, "Programs">;

export type MaxesRouteProp = RouteProp<RootStackParamList, "Maxes">;
