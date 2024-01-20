import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  label: string
  styles: any
  onPress: () => void
}

const Button = ({
  label, styles, onPress
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button;