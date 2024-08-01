import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      <AuthStack.Screen
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#000" },
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <AuthStack.Screen
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#000" },
        }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#000" },
        }}
        name="Register"
        component={RegisterScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
