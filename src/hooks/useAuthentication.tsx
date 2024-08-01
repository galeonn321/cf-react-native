//hook para autenticar al usuario

import { useDispatch, useSelector } from "react-redux";
import { User } from "../types/interfaces";
import { setAuthStatus } from "../lib/redux/slices/authSlice";
import { LOG } from "../config/logger";

const useAuthentication = (isAuthenticated: boolean, user: null | User) => {
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const payload = {
    isAuthenticated: isAuthenticated,
    user: user,
  };

  dispatch(setAuthStatus(payload));

  LOG.info(`isUser authenticated: ${isUserAuthenticated}`);
  return;
};

export default useAuthentication;
