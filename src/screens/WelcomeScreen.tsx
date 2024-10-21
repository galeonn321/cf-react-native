import {
	Box,
	Button,
	ButtonText,
	Heading,
	Image,
	Text,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Dimensions, View } from "react-native";
import Swiper from "react-native-swiper";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../lib/redux/slices/authSlice";
import { useEffect } from "react";
import { LOG } from "../config/logger";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const WelcomeScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation<StackNavigationProp<any>>();

	const handleContinueAsGuest = () => {
		dispatch(setAuthStatus({ isAuthenticated: true }));
	};

	return (
		<Box w="$full" flex={1} bgColor="#000">
			<Swiper
				style={{ height: Height / 1.4, backgroundColor: "#000" }}
				autoplay={true}
				showsPagination={true}
				activeDotColor="#7f1d1d"
				dotColor="#666"
				paginationStyle={{ bottom: Height * 0.1 }}
				showsButtons={false}
				autoplayTimeout={5}
			>
				{/* First Slide */}
				<Box justifyContent="center" alignItems="center" h={Height / 1.4}>
					{/* <Text>Hello Swiper</Text> */}
					<Image
						source={require("../../assets/images/camera-film.jpg")}
						resizeMode="cover"
						w={Width}
						h={Height * 0.4}
						alt="welcome image"
						role="presentation"
					/>
					<Box justifyContent="center" alignItems="center" mx="$12">
						<Text fontSize={"$lg"} color="#fff" mt={"$4"}>
							Welcome to
						</Text>
						<Heading fontSize={"$5xl"} bold color="#fff" pt={"$6"}>
							Central Film
						</Heading>
						<Text textAlign="center" color="#777" mt={"$2"} fontSize={"$xl"}>
							Discover and share a constantly Expanding mix of movies.
						</Text>
					</Box>
				</Box>
				{/* Second Slide */}
				<Box justifyContent="center" alignItems="center" h={Height / 1.4}>
					{/* <Text>Hello Swiper</Text> */}
					<Image
						source={require("../../assets/images/controller-tv.jpg")}
						resizeMode="cover"
						w={Width}
						h={Height * 0.4}
						alt="welcome image"
						role="presentation"
					/>
					<Text fontSize={"$lg"} color="#fff" mt={"$2"}>
						Gather
					</Text>
					<Heading
						fontSize={"$5xl"}
						bold
						color="#fff"
						pt={"$6"}
						textAlign="center"
					>
						True Reviews
					</Heading>
					<Text textAlign="center" color="#777" mt={"$1"} fontSize={"$xl"}>
						Discover what others are saying about your favorite movies and
						express your genuine opinion without any filters.
					</Text>
				</Box>
				{/* Third Slide */}
				<Box justifyContent="center" alignItems="center" h={Height / 1.4}>
					{/* <Text>Hello Swiper</Text> */}
					<Image
						source={require("../../assets/images/entrance-cinema.jpg")}
						resizeMode="cover"
						w={Width}
						h={Height * 0.4}
						alt="welcome image"
						role="presentation"
					/>
					<Text fontSize={"$lg"} color="#fff" mt={"$2"}>
						Quick search for
					</Text>
					<Heading fontSize={"$5xl"} bold color="#fff" pt={"$6"}>
						Films & Series
					</Heading>
					<Text textAlign="center" color="#777" mt={"$1"} fontSize={"$xl"}>
						Unsure of what to watch? Explore your favorite films and series,
						peruse reviews, and make an informed choice.
					</Text>
				</Box>
			</Swiper>
			<Button
				bgColor="$red900"
				mx="$10"
				rounded={"$full"}
				bottom={Height * 0.08}
				onPress={() => navigation.navigate("Login")}
			>
				<ButtonText bold>Login</ButtonText>
			</Button>
			<Text
				textAlign="center"
				bold
				bottom={Height * 0.07}
				onPress={handleContinueAsGuest}
			>
				Continue as guest
			</Text>
		</Box>
	);
};

export default WelcomeScreen;
