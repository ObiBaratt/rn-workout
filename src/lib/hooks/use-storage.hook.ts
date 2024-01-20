import { useState, useEffect, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

export default function useStorage(
  key: string,
  getAllKeys: boolean = false
) {

  const [data, setData] 
    = useState<readonly KeyValuePair[]>([]);

  // Fetch data from storage when 
  // the component mounts. Either
  // fetches all keys or a single key.
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (getAllKeys) {
          // Get all keys and their corresponding values
          const fetchedKeys = await AsyncStorage.multiGet(
            await AsyncStorage.getAllKeys() ?? []
          );

          setData(fetchedKeys);
        } 
        else {
          const storedData = await AsyncStorage.getItem(key);
          if (storedData)
            setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error fetching data from storage:', error);
      }
    };

    fetchData();
  }, [key, getAllKeys]);

  // Save data to storage.
  const saveData = async (newData: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newData));
      setData(newData);

    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  };

  // Clear all data from storage.
  // Depend on how the hook is used in caller,
  // either clears all keys in storage or a single 
  // key.
  const clearData = async () => {
    try {
      if (getAllKeys) {
        const allKeys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(allKeys);

        // @ts-ignore - go back and fix the typing issue; cannot set null to KeyValuePair
        setData(null);
      } 
      else {
        await AsyncStorage.removeItem(key);
        // @ts-ignore - go back and fix the typing issue; cannot set null to KeyValuePair
        setData(null);
      }
    } catch (error) {
      console.error('Error clearing data from storage:', error);
    }
  };

  return { data, saveData, clearData };
};