import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Image,
  Input,
  InputField,
  Pressable,
  Text,
  set,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LOG } from "../config/logger";
const windowHeight = Dimensions.get("window").height;
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { registerUser } from "../helpers/auth";
import { User } from "../types/interfaces";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomModal from "../components/modal/CustomModal";
import { useModal } from "../components/modal/ModalContext";

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { showModal, hideModal } = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    validateEmail(emailInput);
  }, [emailInput]);

  const onPressShowPassword = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
  };

  const handleRegister = () => {
    setIsLoading(true);
    const userData: User = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    };
    if (usernameInput === "" || passwordInput === "" || emailInput === "") {
      setMessage("Username or password or email is empty");
      showModal("Username or password or email is empty", false);
      setIsLoading(false);
      return;
    } else if (passwordInput.length < 8 || passwordInput.length > 12) {
      setMessage("Password must be at least 8 characters but no more than 12");
      showModal(
        "Password must be at least 8 characters but no more than 12",
        false
      );
      setIsLoading(false);
      return;
    } else if (usernameInput.length < 4 || emailInput.length < 4) {
      setMessage("Username or email must be at least 4 characters");
      showModal("Username or email must be at least 4 characters", false);
      setIsLoading(false);
      return;
    } else if (!isEmailValid) {
      setMessage("Email is not valid");
      showModal("Email is not valid", false);
      setIsLoading(false);
      return;
    } else {
      try {
        const userValidation = new Promise((resolve, reject) => {
          // Assume registerUser is an asynchronous function that returns a Promise
          registerUser(userData)
            .then((result) => {
              // Handle successful registration
              LOG.info("entre al primer result wtf");
              resolve(result);
            })
            .catch((error: any) => {
              // Handle registration failure
              LOG.info("entre al primer catch de error wtf", error);
              reject(error);
            });
        });

        userValidation
          .then((result: any) => {
            // Dispatch action or perform other actions on successful registration
            LOG.debug("Registration successful after validation:", result);
            //open a modal
            if (result?.ok === true) {
              LOG.info("entre al result ok", result);
              setIsLoading(false);
              setMessage("Registration successful");
              showModal("Registration successful", true);

              setTimeout(() => {
                hideModal()
                navigation.navigate("Login");
              }, 3000);
            } else {
              LOG.error("Registration failed:", result);
              setIsLoading(false);
              setMessage(result.message);
              showModal(result.message, false);
            }
          })
          .catch((error) => {
            // Handle any other errors
            console.error("Registration failed:", error);
          });
      } catch (error) {
        setIsLoading(false);
        console.error("Registration failed:", error);
      }
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
      <Heading
        alignSelf="center"
        color="#fff"
        fontSize={"$5xl"}
        pt="$10"
        mt="$4"
        mb="$8"
      >
        Central Film
      </Heading>
      <Box mx="$8">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText color="#fff">User</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined" borderColor="#fff">
            <InputField
              value={usernameInput}
              color="#fff"
              selectionColor={"#fff"}
              onChangeText={(text: string) => setUsernameInput(text)}
            />
            {usernameInput.length > 0 && (
              <Pressable
                onPress={() => setUsernameInput("")}
                justifyContent="center"
              >
                <AntDesign name="close" size={25} color={"#fff"} />
              </Pressable>
            )}
          </Input>
        </FormControl>
        <FormControl mt={"$4"}>
          <FormControlLabel>
            <FormControlLabelText color="#fff">E-mail</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined" borderColor="#fff">
            <InputField
              value={emailInput}
              color="#fff"
              selectionColor={"#fff"}
              onChangeText={(text: string) => setEmailInput(text)}
            />
            {emailInput.length > 0 && (
              <Pressable
                onPress={() => setEmailInput("")}
                justifyContent="center"
              >
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
              color="#fff"
              selectionColor={"#fff"}
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
        </FormControl>
        {isLoading ? (
          <ButtonSpinner size={"large"} mt="$10" color={"$red900"} />
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
            onPress={handleRegister}
          >
            <ButtonText fontWeight="bold">Create Account</ButtonText>
          </Button>
        )}
        <Text
          textAlign="center"
          mt="$4"
          fontWeight="bold"
          color="#fff"
          onPress={() => navigation.navigate("Login")}
        >
          Sign in
        </Text>
      </Box>
      {/* Modal will be automatically shown when showModal is called */}
      <CustomModal message={message}></CustomModal>
    </Box>
  );
};

export default RegisterScreen;
