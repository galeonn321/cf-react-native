import React, { useState } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
	Box,
	Button,
	ButtonSpinner,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	Heading,
	Image,
	Input,
	InputField,
	Pressable,
	Text,
	ButtonText,
} from "@gluestack-ui/themed";
import { LOG } from "../config/logger";
import CustomModal from "../components/modal/CustomModal";
import { useModal } from "../components/modal/ModalContext";
import { authenticateUser, loginUser } from "../helpers/auth";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../lib/redux/slices/authSlice";
import { addUser } from "../lib/redux/slices/userSlice";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { AuthenticateUserResponse, UserValidationResult } from "../types/responseTypes";

const windowHeight = Dimensions.get("window").height;

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [usernameInput, setUsernameInput] = useState<string>("");
	const [passwordInput, setPasswordInput] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { showModal, hideModal } = useModal();

	const onPressShowPassword = () => {
		setShowPassword((showState) => !showState);
	};

	const handleLogin = async () => {
		// setIsLoading(true);

		if (!usernameInput || !passwordInput) {
			setIsLoading(false);
			LOG.debug("Inputs vacíos");
			setMessage("Username or password is empty");
			showModal("Username or password or email is empty", false);
			return;
		}

		try {
			const userData = {
				username: usernameInput.toLowerCase(),
				email: usernameInput,
				password: passwordInput,
			};

			const userValidation: Promise<UserValidationResult> = loginUser(userData);

			userValidation.then(async (result) => {
				// LOG.error(result, 'Este es el resultado de la verdad de nuclear');
				if (result.ok) {
					const userData: AuthenticateUserResponse | null = await authenticateUser();

					if (userData?.data) {
						setMessage(result.message);
						showModal(result.message, false);

						dispatch(addUser(userData.data));
						setTimeout(() => {
							dispatch(
								setAuthStatus({
									isAuthenticated: true,
								})
							);
						}, 2000);
					} else {
						LOG.error("No se encontró el usuario");
					}
				} else {
					LOG.info("Error de validación:", result.message);
					setMessage(result.message);
					showModal(result.message, false);
				}
			}).catch((error) => {
				LOG.info("Error en el primer catch:", error);
				setIsLoading(false);
			});
		} catch (error) {
			LOG.info("Error en el segundo catch:", error);
			setIsLoading(false);
		}
	};

	return (
		<Box w="$full" h={windowHeight} bgColor="$black">
			<Image
				source={require("../../assets/images/cinema.jpg")}
				alt="miniature example"
				size="full"
				opacity={0.5}
				alignSelf="center"
				mt="$2"
				role="presentation"
				position="absolute"
			/>
			<Heading alignSelf="center" color="#fff" fontSize={"$5xl"} pt="$20" mb="$6">
				Central Film
			</Heading>
			<Box mx="$8">
				<FormControl>
					<FormControlLabel>
						<FormControlLabelText color="#fff">User or E-mail</FormControlLabelText>
					</FormControlLabel>
					<Input variant="underlined" borderColor="#fff">
						<InputField
							value={usernameInput}
							color="#fff"
							selectionColor={"#fff"}
							onChangeText={(text: string) => setUsernameInput(text)}
						/>
						{usernameInput.length > 0 && (
							<Pressable onPress={() => setUsernameInput("")} justifyContent="center">
								<AntDesign name="close" size={25} color={"#fff"} />
							</Pressable>
						)}
					</Input>
				</FormControl>
				<FormControl mt={"$4"} size="md">
					<FormControlLabel mb="$1">
						<FormControlLabelText color="#fff">Password</FormControlLabelText>
					</FormControlLabel>
					<Input variant="underlined" borderColor="#fff">
						<InputField
							value={passwordInput}
							type={showPassword ? "text" : "password"}
							selectionColor={"#fff"}
							color="#fff"
							onChangeText={(text: string) => setPasswordInput(text)}
						/>
						<Ionicons
							name={showPassword ? "eye" : "eye-off"}
							size={20}
							style={{ alignSelf: "center" }}
							color={"#fff"}
							onPress={onPressShowPassword}
						/>
					</Input>
					<Text mt="$3" color="#fff9">Forgot Password?</Text>
				</FormControl>
				{isLoading ? (
					<ButtonSpinner mt="$10" color={"$red900"} size={"large"} />
				) : (
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
						<ButtonText fontWeight="bold">Log In</ButtonText>
					</Button>
				)}
				<Text
					textAlign="center"
					mt="$6"
					fontWeight="bold"
					color="#fff"
					onPress={() => navigation.navigate("Register")}
				>
					Sign up
				</Text>
			</Box>
			<CustomModal message={message} />
		</Box>
	);
};

export default LoginScreen;
