import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const getAsyncStorage = async (key: string) => {
    const getAsyncStorageData = await AsyncStorage.getItem(key);
    const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
    return getAsyncStorageParsed;
}