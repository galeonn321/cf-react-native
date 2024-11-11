import { View, ScrollView, Dimensions } from "react-native";
import React from "react";
import {
	AddIcon,
	Box,
	Divider,
	HStack,
	Image,
	Pressable,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LOG } from "../config/logger";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const insets = useSafeAreaInsets();

	return (
		<ScrollView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
			<Box
				justifyContent="center"
				alignItems="center"
				bgColor="#fff"
				pt={insets.top + 20}
				pb={"$10"}
				mb="$10"
				borderTopEndRadius={0}
				borderTopStartRadius={0}
				borderRadius={25}
				style={{
					shadowColor: "#888888",
					elevation: 8,
				}}
			>
				<Image
					source={require("../../assets/images/avatar_default.jpg")}
					alt="profile avatar"
					size="xl"
					rounded={"$full"}
				/>
				<Text fontSize={"$xl"} color="#333333" fontWeight={"$medium"}>
					Hanna Sprat
				</Text>
				<Text fontSize={"$sm"} color="#888888">
					hannaSprat@gmail.com
				</Text>
				<HStack space="3xl" mt="$8">
					<Box alignItems="center">
						<Text color="#888888" bold>
							196
						</Text>
						<Text color="#888888" fontSize={"$xs"}>
							Movies
						</Text>
					</Box>
					<Divider orientation="vertical" bg="#888888" />
					<Box alignItems="center">
						<Text color="#888888" bold>
							345
						</Text>
						<Text color="#888888" fontSize={"$xs"}>
							Comments
						</Text>
					</Box>
					<Divider orientation="vertical" bg="#888888" />
					<Box alignItems="center">
						<Text color="#888888" bold>
							120
						</Text>
						<Text color="#888888" fontSize={"$xs"}>
							Ratings
						</Text>
					</Box>
				</HStack>
			</Box>
			<Box mx="$6" mb={"$10"}>
				<Text fontWeight={"$medium"}>My movies</Text>
				<Divider mt="$2" mb="$10" />
				<VStack space="3xl">
					<Pressable
						onPress={() => {
							LOG.debug("this is from the PlayingNowComponent");
							navigation.navigate("WantToWatch");
						}}
					>
						<HStack justifyContent="space-between" alignItems="center">
							<HStack alignItems="flex-end" space="md">
								<Ionicons name={"bookmark"} size={18} color={"#FF6F00"} />
								<Text color="#888">Want to watch</Text>
							</HStack>
							<Text color="#888">27</Text>
						</HStack>
					</Pressable>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"star"} size={18} color={"#FF6F00"} />
							<Text color="#888">Ratings and reviews</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"time"} size={18} color={"#FF6F00"} />
							<Text color="#888">Expected</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"heart"} size={18} color={"#FF6F00"} />
							<Text color="#888">Favorite Films</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"flame"} size={18} color={"#FF6F00"} />
							<Text color="#888">Recommended</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
				</VStack>
			</Box>
			<Box mx="$6" mb={"$10"}>
				<Text fontWeight={"$medium"}>My series</Text>
				<Divider mt="$2" mb="$10" />
				<VStack space="3xl">
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"bookmark"} size={18} color={"#FF6F00"} />
							<Text color="#888">Want to watch</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"star"} size={18} color={"#FF6F00"} />
							<Text color="#888">Ratings and reviews</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"time"} size={18} color={"#FF6F00"} />
							<Text color="#888">Expected</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"heart"} size={18} color={"#FF6F00"} />
							<Text color="#888">Favorite Films</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack alignItems="flex-end" space="md">
							<Ionicons name={"flame"} size={18} color={"#FF6F00"} />
							<Text color="#888">Recommended</Text>
						</HStack>
						<Text color="#888">27</Text>
					</HStack>
				</VStack>
			</Box>
		</ScrollView>
	);
};

export default ProfileScreen;
