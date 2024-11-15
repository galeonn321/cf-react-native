import { useEffect, useState } from "react";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../lib/redux/slices/authSlice";
import LoadingScreen from "../screens/LoadingScreen";
import { authenticateUser } from "../helpers/auth";
import { LOG } from "../config/logger";
import { addUser } from "../lib/redux/slices/userSlice";
import type { RootState } from "../lib/redux/store";

const AppNavigator: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		hasUserAccount();
	}, []);

	const hasUserAccount = async () => {
		setIsLoading(true);
		const userData = await authenticateUser();

		LOG.debug(userData, "hahaha");

		if (userData?.ok && userData.data) {
			dispatch(setAuthStatus({ isAuthenticated: true }));
			dispatch(addUser(userData.data));
		} else {
			LOG.info("No token found, please log in again or create an account.");
		}

		setIsLoading(false);
	};

	const isUserAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return isUserAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
