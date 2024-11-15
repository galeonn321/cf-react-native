import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FilmsScreen from "../screens/FilmsScreen";
import SeriesScreen from "../screens/SeriesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

type RootTabParamList = {
	Home: undefined;
	Films: undefined;
	Series: undefined;
	Profile: undefined;
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomTabNavigator = () => {
	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarActiveTintColor: "#000",
				tabBarInactiveTintColor: "#777",
				headerShadowVisible: false,
				tabBarStyle: {
					position: "absolute",
					bottom: 20,
					height: 55,
					marginHorizontal: 20,
					backgroundColor: "#FEF9F2",
					borderRadius: 30,
					shadowColor: "#000",
					shadowOpacity: 0.2,
					shadowRadius: 10,
					borderTopWidth: 0,
				},
				tabBarIcon: ({
					color,
					focused,
					size,
				}: { color: string; focused: boolean; size: number }) => {
					let iconName: React.ComponentProps<typeof Ionicons>["name"] =
						"home-outline";
					switch (route.name) {
						case "Home":
							iconName = focused ? "home" : "home-outline";
							break;
						case "Films":
							iconName = focused ? "film" : "film-outline";
							break;
						case "Series":
							iconName = focused ? "tv" : "tv-outline";
							break;
						case "Profile":
							iconName = focused ? "person" : "person-outline";
							break;
					}
					return (
						<Ionicons
							name={iconName}
							size={20}
							color={focused ? "#000" : "#777"}
						/>
					);
				},
			})}
		>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<BottomTab.Screen
				name="Films"
				component={FilmsScreen}
				options={{ headerShown: false }}
			/>
			<BottomTab.Screen
				name="Series"
				component={SeriesScreen}
				options={{ headerShown: false }}
			/>
			<BottomTab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
		</BottomTab.Navigator>
	);
};

export default BottomTabNavigator;
