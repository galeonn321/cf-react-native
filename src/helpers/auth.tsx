
import { LOG } from "../config/logger";
import { getTokenFromUser, setTokenToUser } from "../services/user.services";
import { User, UserLogin } from "../types/interfaces";

const API_URL_REGISTER = "http://192.168.1.180:3000/api/auth/register";
const API_URL_LOGIN = "http://192.168.1.180:3000/api/auth/login";
const API_URL_LOGOUT = "http://192.168.1.180:3000/api/auth/logout";
const API_URL_GET_USER_BY_ID = "http://192.168.1.180:3000/api/auth/getUserById";


// const API_URL_REGISTER = "http://192.168.1.246:4000/api/auth/register";
// const API_URL_LOGIN = "http://192.168.1.246:4000/api/auth/login";
// const API_URL_GET_USER_BY_ID = "http://192.168.1.246:4000/api/auth/getUserById";
// const API_URL_AUTHENTICATE_USER =
//   "http://192.168.1.246:4000/api/auth/authenticateUser";

export const registerUser = async (user: User) => {
  try {
    LOG.info("Registering user...");
    const resp: any = await fetch(API_URL_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data: any = await resp.json();

    return data;
  } catch (error) {
    LOG.error(`Error in registerUser: ${error}`);
  }
};

export const loginUser = async (user: UserLogin) => {
  try {
    const resp: any = await fetch(API_URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data: any = await resp.json();

    if (data.ok === true) {
      await setTokenToUser(data.data.token);
      const tokenSaved = await getTokenFromUser();
      LOG.debug("se guardo bien el token en el movil", tokenSaved);
    } else {
      ("no se pudo validar tu login perro algo escribiste mal");
    }
    return data;
  } catch (error) {
    LOG.error(error, "Error in loginUser function of auth");
  }
};

export const authenticateUser = async () => {
  const token = await getTokenFromUser();

  try {
    const resp: any = await fetch(API_URL_GET_USER_BY_ID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const userData: any = await resp.json();

    return userData;
  } catch (error) {}
};

export const logoutUser = async () => {};
