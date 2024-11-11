import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Box } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import PlayingNowComponent from "../components/carouselComponent/CarouselComponent";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SeriesScreen = () => {
	const insets = useSafeAreaInsets();

	return (
		<ScrollView
			style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#000" }}
		>
			<PlayingNowComponent path={""} />
		</ScrollView>
	);
};

export default SeriesScreen;
