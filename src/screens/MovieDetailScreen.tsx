import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Divider,
	HStack,
	Image,
	ImageBackground,
	ScrollView,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import CommentItem from "../components/commentSectionComponent/CommentItem";
import FilmCommentInput from "../components/filmCommentInput/FilmCommentInput";
import { LOG } from "../config/logger";
import { ButtonText } from "@gluestack-ui/themed";
import type { RootStackParams } from "../navigators/MainNavigator";
import type { StackScreenProps } from "@react-navigation/stack";
import type { Movie } from "../types/movieInterface";

const { width, height } = Dimensions.get("window");

interface Props extends StackScreenProps<RootStackParams, "DetailMovie"> {}

const MovieDetailScreen = ({ route }: Props) => {
	const { filmItem } = route.params;
	LOG.info(filmItem);
	const [isTruncated, setIsTruncated] = useState(true);
	const roundedNumber = Number.parseFloat(filmItem.vote_average.toFixed(1));
	const Data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77];
	const genresList = [
		{ id: 28, name: "Action" },
		{ id: 12, name: "Adventure" },
		{ id: 16, name: "Animation" },
		{ id: 35, name: "Comedy" },
		{ id: 80, name: "Crime" },
		{ id: 99, name: "Documentary" },
		{ id: 18, name: "Drama" },
		{ id: 10751, name: "Family" },
		{ id: 14, name: "Fantasy" },
		{ id: 36, name: "History" },
		{ id: 27, name: "Horror" },
		{ id: 10402, name: "Music" },
		{ id: 9648, name: "Mystery" },
		{ id: 10749, name: "Romance" },
		{ id: 878, name: "Science Fiction" },
		{ id: 10770, name: "TV Movie" },
		{ id: 53, name: "Thriller" },
		{ id: 10752, name: "War" },
		{ id: 37, name: "Western" },
	];

	const genreNames = filmItem.genre_ids.map((genreId) => {
		const genre = genresList.find((g) => g.id === genreId);
		return genre ? genre.name : null;
	});

	const seeMore = () => {
		setIsTruncated(!isTruncated);
	};

	return (
		<Box backgroundColor="#fff">
			<ImageBackground
				source={{
					uri: filmItem.poster_path
						? `https://image.tmdb.org/t/p/w500${filmItem.poster_path}`
						: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80",
				}}
				alt="background image"
				h={height / 1.55}
				w={"$full"}
				flex={1}
			/>
			<ScrollView
				backgroundColor="transparent"
				paddingTop={height / 1.65}
				opacity={1}
				overScrollMode="never"
				bounces={false}
			>
				<Box
					backgroundColor="#FFF"
					borderTopEndRadius={20}
					borderTopStartRadius={20}
					opacity={1}
					px={"$4"}
				>
					<Divider
						mt={"$4"}
						h={3}
						borderRadius={"$full"}
						w={50}
						alignSelf="center"
						backgroundColor="#000"
					/>
					<HStack justifyContent="space-between" alignItems="center" pt="$4">
						<Text
							fontWeight="700"
							color="#000"
							fontSize="$3xl"
							maxWidth={width / 1.5}
						>
							{filmItem.title}
						</Text>
						<Ionicons name={"bookmark-outline"} size={24} color={"#000"} />
					</HStack>
					<HStack mt={"$4"} alignItems="center" space="sm" mb={"$2"}>
						<Text bold color="#000">
							⭐{roundedNumber}/10 IMDB
						</Text>
					</HStack>
					<HStack mt={"$1"} alignItems="center" space="sm">
						<Text bold color="#000">
							⭐{roundedNumber}/10 Central Film
						</Text>
						{roundedNumber > 7 ? (
							<Box px={"$2"} py={"$1"} backgroundColor="#000" rounded={"$full"}>
								<Text fontSize={"$xs"} color="#fff">
									Recommended🔥
								</Text>
							</Box>
						) : (
							<></>
						)}
					</HStack>
					<HStack space="md" mt={"$4"} maxWidth={width} flexWrap="wrap">
						{genreNames.map((genre, index) => (
							<Box
								backgroundColor="#DBE3FF"
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={`${genre}-${index}`}
								py={"$0.5"}
								px={"$3"}
								rounded={"$full"}
							>
								<Text color="#88A4E8" fontWeight={400} fontSize={"$sm"}>
									{genre}
								</Text>
							</Box>
						))}
					</HStack>
					<Box my="$4">
						<Text fontSize="$lg" bold>
							Where to watch
						</Text>
						<HStack
							mx="$2"
							mt="$4"
							flexWrap="wrap"
							space="lg"
							justifyContent="center"
						>
							{genresList.map((item, index) => (
								<Box
									backgroundColor="#DBE3FF"
									key={`${item.id}-${index}`}
									py={"$6"}
									px={"$6"}
									rounded={"$full"}
								>
									<Text color="#88A4E8" fontWeight={400} fontSize={"$sm"}>
										{item.id}
									</Text>
								</Box>
							))}
						</HStack>
					</Box>
					<HStack mt="$4" space="4xl">
						<VStack>
							<Text color="#979797">Original Language</Text>
							<Text color="#000">
								{filmItem.original_language.toUpperCase()}
							</Text>
						</VStack>
						<VStack>
							<Text color="#979797">Release Date</Text>
							<Text color="#000">{filmItem.release_date}</Text>
						</VStack>
					</HStack>

					<Box mt="$4">
						<Text mb="$1" color={"#000"} fontWeight="800">
							Description
						</Text>
						<Text
							color="#000"
							fontFamily="$heading"
							numberOfLines={isTruncated ? 2 : undefined}
						>
							{filmItem.overview}
						</Text>
						{isTruncated && (
							<Text
								mb="$4"
								color="#000"
								fontWeight="800"
								onPress={seeMore}
								textAlign="right"
							>
								See more
							</Text>
						)}
					</Box>

					<Box pt="$6">
						<FilmCommentInput />
						<Text mt="$6" color="#000" fontSize={"$md"}>
							Comments {Data.length}
						</Text>
						<FlashList
							data={Data}
							renderItem={CommentItem}
							estimatedItemSize={250}
						/>
					</Box>
				</Box>
			</ScrollView>
		</Box>
	);
};

export default MovieDetailScreen;
