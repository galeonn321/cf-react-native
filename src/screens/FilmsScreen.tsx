import { ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CarouselComponent from "../components/carouselComponent/CarouselComponent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, Text } from "@gluestack-ui/themed";

const FilmsScreen = () => {
	const navigator = useNavigation();
	const insets = useSafeAreaInsets();

	return (
		<ScrollView
			style={{ flex: 1, paddingTop: insets.top + 40, backgroundColor: "#000" }}
		>
			<Text
				color="#fff"
				textAlign="center"
				p={"$2"}
				fontWeight="$extrabold"
				fontSize={"$3xl"}
			>
				Now playing
			</Text>
			<CarouselComponent path={"now_playing"} />
			<Text
				color="#fff"
				textAlign="center"
				p={"$2"}
				fontWeight="$extrabold"
				fontSize={"$3xl"}
			>
				Popular
			</Text>
			<CarouselComponent path={"popular"} />
			<Text
				color="#fff"
				textAlign="center"
				p={"$2"}
				mb="$4"
				fontWeight="$extrabold"
				fontSize={"$3xl"}
			>
				upcoming
			</Text>
			<CarouselComponent path={"upcoming"} />
			<Box mb="$72" />
		</ScrollView>
	);
};

export default FilmsScreen;
