import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	Input,
	InputField,
	InputIcon,
	Pressable,
	Text,
	Image,
	Spinner,
	Divider,
	HStack,
	VStack,
} from "@gluestack-ui/themed";
import { LOG } from "../../config/logger";
import searchMovieDB from "../../helpers/searchMovieDB";
import { FlashList } from "@shopify/flash-list";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, View } from "react-native";
import type { Movie, MovieItem } from "../../types/movieInterface";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMovie } from "../../helpers/addHelpers";
import type { RootStackParams } from "../../navigators/MainNavigator";

const { height, width } = Dimensions.get("screen");

const SearchContent = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
	const [inputText, setInputText] = useState<string>("");
	const [searchResults, setSearchResults] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const movieSearch = async () => {
		try {
			setIsLoading(true);
			const results = await searchMovieDB(inputText);
			LOG.info(results[0]);
			setSearchResults(results);
			setIsLoading(false);
		} catch (error) {
			LOG.error(error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		movieSearch();
	}, [inputText]);

	const verifyMovieExists = async (filmItem: Movie) => {
		try {
			const result = await createMovie(filmItem);

			LOG.debug(result);

			if (result?.ok) {
				navigation.navigate("DetailMovie", { filmItem });
			} else {
				LOG.info("Movie was not created or already exists", result);
			}
		} catch (error) {
			LOG.error("Error in verifyMovieExists", error);
			setIsLoading(false);
		}
	};

	const renderItem = ({ item }: MovieItem) => {
		const roundedNumber = Number.parseFloat(item.vote_average.toFixed(1));
		const uri = item.poster_path
			? `https://image.tmdb.org/t/p/w500${item.poster_path}`
			: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80";

		return (
			<Pressable
				onPress={() => verifyMovieExists(item)}
				my="$4"
				borderWidth={1}
				borderColor="#7777"
				borderRadius={32}
			>
				<Image
					height={400}
					width={width}
					size={"2xl"}
					borderRadius={32}
					source={{
						uri: uri,
					}}
					resizeMode="cover"
					alt="miniature example"
					role="presentation"
					opacity={0.6}
				/>
				<HStack
					px={"$2"}
					py={"$1"}
					backgroundColor="#000"
					rounded={"$full"}
					position="absolute"
					top={20}
					left={20}
					alignItems="center"
				>
					<Ionicons
						name={roundedNumber > 7 ? "flame" : "star"}
						size={16}
						color={roundedNumber > 7 ? "#FFFF00" : "#FFFF00"}
					/>
					<Text fontSize={"$lg"} color="#fff">
						{` ${roundedNumber}`}
					</Text>
				</HStack>

				{item.vote_average > 7 ? (
					<Box
						px={"$2"}
						py={"$1"}
						backgroundColor="#000"
						rounded={"$full"}
						position="absolute"
						top={20}
						right={20}
					>
						<Text fontSize={"$xl"} color="#fff">
							Recommended🔥
						</Text>
					</Box>
				) : (
					<></>
				)}
				<VStack left="$4" bottom="$6" position="absolute">
					<Text
						color="#fff"
						fontWeight="500"
						maxWidth={width * 0.7}
						fontSize={"$3xl"}
					>
						{item.title}
					</Text>
					<Text
						color="#fff"
						fontWeight="500"
						maxWidth={width * 0.7}
						fontSize={"$lg"}
					>
						<Ionicons name={"calendar"} size={14} color={"#fff"} />
						{` ${item.release_date}`}
					</Text>
				</VStack>
				<Box
					position="absolute"
					right="$4"
					bottom="$4"
					bg="#000"
					borderRadius="$full"
					p="$2"
				>
					<Ionicons name={"chevron-forward"} size={30} color={"#fff"} />
				</Box>
			</Pressable>
		);
	};

	return (
		<>
			<Box bgColor="#000">
				<Heading color="#fff" fontWeight="$extrabold" fontSize={"$md"}>
					type the film you are looking for..
				</Heading>

				<Input
					bgColor={"$warmGray700"}
					borderColor="#777"
					borderWidth={2}
					borderRadius={"$full"}
					my="$2"
					alignItems="center"
					px={"$2"}
				>
					<AntDesign name="search1" size={20} color="white" />
					<InputField
						onChangeText={(text: string) => setInputText(text)}
						value={inputText}
						color="#fff"
						placeholder="Titanic, Frozen, Eyes Wide Shut.."
						selectionColor={"#fff"}
					/>
					{inputText.length > 0 && (
						<Pressable
							onPress={() => setInputText("")}
							bgColor="#777"
							borderRadius="$full"
						>
							<Ionicons name={"close-outline"} size={25} color={"#fff"} />
						</Pressable>
					)}
				</Input>
			</Box>
			{isLoading ? (
				<Box
					w="$32"
					h="$32"
					alignSelf="center"
					alignItems="center"
					justifyContent="center"
					mt="$4"
					minHeight={"$10"}
				>
					<Spinner size={"large"} />
				</Box>
			) : (
				<Box flex={1} pb="$4">
					<FlashList
						data={searchResults}
						renderItem={renderItem}
						estimatedItemSize={350}
						estimatedListSize={{ height: 350, width: width }}
						showsHorizontalScrollIndicator={false}
					/>
				</Box>
			)}
		</>
	);
};

export default SearchContent;
