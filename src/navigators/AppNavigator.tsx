import { useEffect, useState } from "react";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../lib/redux/slices/authSlice";
import LoadingScreen from "../screens/LoadingScreen";
import { authenticateUser } from "../helpers/auth";
import { LOG } from "../config/logger";
import { addUser } from "../lib/redux/slices/userSlice";

const AppNavigator: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		hasUserAccount();
	}, []);

	const hasUserAccount = async () => {
		setIsLoading(true);
		const userData = await authenticateUser();
		if (userData.ok === true || false) {
			dispatch(setAuthStatus({ isAuthenticated: true }));
			dispatch(addUser(userData.data));
			setIsLoading(false);
			return;
		}
		setIsLoading(false);
		LOG.info("no token found, please log in again or create account.");
		return;
	};

	const isUserAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return isUserAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
