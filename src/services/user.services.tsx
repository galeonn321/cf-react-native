import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOG } from "../config/logger";
import { TOKEN_KEY } from "@env";

export const setTokenToUser = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    LOG.error(`Error in setTokenToUser, error: ${error}`);
  }
};

export const getTokenFromUser = async () => {
  try {
    const keyToken = await AsyncStorage.getItem(TOKEN_KEY);
    if (keyToken !== '') {
      return keyToken;
    }
  } catch (error) {
    LOG.error(`Error in getTokenFromUser, error: ${error}`);
  }
};

export const removeTokenFromUser = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    LOG.info("token removed");
    return;
  } catch (error) {
    LOG.error(error);
  }
};
