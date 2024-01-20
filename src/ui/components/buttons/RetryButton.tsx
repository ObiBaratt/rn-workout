import { Text, TouchableOpacity, View } from 'react-native';

interface RetryButtonProps { 
  styles: any, 
  onPress: () => void 
}

const RetryButton = ({ styles, onPress}: RetryButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.title}>
          Failed to load data. Retry?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RetryButton;