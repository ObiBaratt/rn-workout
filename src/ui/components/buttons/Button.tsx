import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

interface ButtonProps {
  label: string,
  styles: any,
  onPress: () => void,
  asTextButton?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  styles,
  onPress = () => { console.log('No onPress was passed')},
}: ButtonProps) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

export default Button;

