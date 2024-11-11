import { createStackNavigator } from "@react-navigation/stack";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import WantToWatch from "../screens/WantToWatch";
import type { Movie } from "../types/movieInterface";

export type RootStackParams = {
	HomeScreen: undefined;
	BottomTabNavigator: undefined;
	DetailMovie: { filmItem: Movie };
	WantToWatch: undefined;
};

const MainStack = createStackNavigator<RootStackParams>();

const isSignedIn = true;

function MainNavigator() {
	return (
		<MainStack.Navigator initialRouteName="HomeScreen">
			<MainStack.Screen
				options={{
					title: "Want to watch",
					headerTitleAlign: "center",
					headerShadowVisible: false,
					headerBackTitle: " ",
					headerTitleStyle: {
						fontSize: 14,
					},
					headerTintColor: "#888888",
					headerStyle: { backgroundColor: "#fff" },
				}}
				name="WantToWatch"
				component={WantToWatch}
			/>
			<MainStack.Screen
				options={{
					headerShown: false,
				}}
				name="DetailMovie"
				component={MovieDetailScreen}
			/>
			<MainStack.Screen
				options={{ headerShown: false }}
				name="HomeScreen"
				component={BottomTabNavigator}
			/>
		</MainStack.Navigator>
	);
}

export default MainNavigator;
