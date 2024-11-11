import type React from "react";
import { useEffect } from "react";
import { User } from "../../types/interfaces";
import { setAuthStatus } from "../../lib/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Box, Button, ButtonText, Modal } from "@gluestack-ui/themed";
import { LOG } from "../../config/logger";

interface LoginButtonProps {
	usernameInput: string;
	passwordInput: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
	usernameInput,
	passwordInput,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		LOG.info(usernameInput, passwordInput);
	}, []);

	const handleLogin = async () => {
		if (usernameInput === "" || passwordInput === "") {
			LOG.error("Username or password is empty");
			return;
		}
	};

	return (
		<Button
			mt="$10"
			rounded={"$full"}
			bgColor="$red900"
			size="md"
			variant="solid"
			action="primary"
			isDisabled={false}
			isFocusVisible={false}
			onPress={handleLogin}
		>
			<ButtonText>Log In</ButtonText>
		</Button>
	);
};

export default LoginButton;
