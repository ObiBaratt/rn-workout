import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Button from '../buttons/Button';

type OneRepMax = {
  name: string
  weight: string
  dateAchieved?: string
}

interface OneRepMaxCardProps {
  storageKey: KeyValuePair
  details?: OneRepMax,
  styles: any
  edit: (key: string, value: string | null) => void
  moveTo: (weight: number) => void
}

const OneRepMaxCard = ({
  storageKey, details, styles, edit, moveTo
}: OneRepMaxCardProps) => {

  const liftName = storageKey[0];
  const repMaxWeight = storageKey[1];

  return (
    <TouchableOpacity>
      <View style={styles.maxList}>
        <Text 
          style={styles.title}
          onPress={() => edit(liftName, repMaxWeight)}
        >
         {liftName}: {repMaxWeight}
        </Text>
        <Button 
          label='Gen Program' styles={styles}
          onPress={() => moveTo(Number(repMaxWeight) || 0)}
        />
      </View>
    </TouchableOpacity>
  );
}

export default OneRepMaxCard;