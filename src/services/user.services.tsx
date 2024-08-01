import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOG } from "../config/logger";
import { TOKEN_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../lib/redux/slices/authSlice";

export const setTokenToUser = async (token: string) => {
  try {
    // const jsonToken = JSON.stringify(token);
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    LOG.error(`Error in setTokenToUser, error: ${error}`);
  }
};

export const getTokenFromUser = async () => {
  try {
    const keyToken = await AsyncStorage.getItem(TOKEN_KEY);
    LOG.info("keytoken found:", keyToken);

    if (keyToken !== '') {
      return keyToken;
    }
  } catch (error) {
    LOG.error(`Error in getTokenFromUser, error: ${error}`);
  }
};

export const removeTokenFromUser = async () => {
  const dispatch = useDispatch();
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    LOG.info("token removed");
    dispatch(setAuthStatus({ isAuthenticated: false }));
    return;
  } catch (error) {
    LOG.error(error);
  }
};
