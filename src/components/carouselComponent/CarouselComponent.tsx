import {
	Box,
	HStack,
	Image,
	Pressable,
	Spinner,
	Text,
} from "@gluestack-ui/themed";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import useMovieDB from "../../hooks/useMovieDB";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { Movie } from "../../types/movieInterface";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { LOG } from "../../config/logger";

const { height, width } = Dimensions.get("screen");

type CarouselComponentProps = {
	path: string;
};

const CarouselComponent: React.FC<CarouselComponentProps> = ({ path }) => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const films = useMovieDB(path);

	useEffect(() => {
		if (films === undefined) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [films]);

	const renderItem = ({ item }: { item: Movie }, index: number) => {
		const uri = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
		const roundedNumber = Number.parseFloat(item.vote_average.toFixed(1));
		return (
			<Pressable
				onPress={() => {
					LOG.debug(item, "this is from the PlayingNowComponent");
					navigation.navigate("DetailMovie", {
						filmItem: item,
					});
				}}
			>
				<Image
					height={height / 3.05}
					width={width / 2.1}
					rounded={"$2xl"}
					source={{
						uri: uri,
					}}
					resizeMode="contain"
					alt="miniature example"
					ml="$2"
					role="presentation"
				/>
				<Text
					color="#fff"
					italic
					fontWeight="700"
					textAlign="center"
					fontSize={"$xl"}
					py={"$2"}
					maxWidth={"$48"}
				>
					{item.title}
				</Text>
				<HStack
					position="absolute"
					w={50}
					h={30}
					top={10}
					space="xs"
					right={15}
					bgColor={"$red900"}
					alignItems="center"
					justifyContent="center"
					rounded={"$xl"}
				>
					<Ionicons
						name={item.vote_average > 7.5 ? "flame" : "star"}
						size={12}
						color={item.vote_average > 7.5 ? "#FFFF00" : "#fff"}
					/>
					<Text color="#fff" bold>
						{roundedNumber}
					</Text>
				</HStack>
			</Pressable>
		);
	};

	return (
		<Box>
			{isLoading ? (
				<Spinner size="large" />
			) : (
				<Box height={height / 2.3}>
					<FlashList
						data={films}
						renderItem={renderItem as any}
						estimatedItemSize={height / 2.3}
						estimatedListSize={{ height: height / 2.3, width: width }}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				</Box>
			)}
		</Box>
	);
};

export default CarouselComponent;
