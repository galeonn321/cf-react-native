import { Dimensions, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchContent from "../components/searchContent/SearchContent";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { useEffect, useState } from "react";
import { Drawer } from "react-native-drawer-layout";
import { removeTokenFromUser } from "../services/user.services";
import { setAuthStatus } from "../lib/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LOG } from "../config/logger";
import { removeUser } from "../lib/redux/slices/userSlice";
import * as ImagePicker from "expo-image-picker";

const { height } = Dimensions.get("screen");

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.user);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Se necesita permiso para acceder a la galería");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    LOG.warn(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    LOG.info(image);
  }, [image]);

  const handleLogout = async () => {
    await removeTokenFromUser();
    dispatch(removeUser());
    dispatch(setAuthStatus({ isAuthenticated: false }));
  };

  useEffect(() => {
    LOG.warn(userData, `esto es lo que traje?`);
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          paddingTop: insets.top,
          backgroundColor: "#000",
        }}
      >
        <Drawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          drawerStyle={{
            height: height,
            backgroundColor: "#F7F9F2",
            borderTopLeftRadius: 20,
            borderWidth: 5,
            borderColor: "#F7F9F2",
          }}
          drawerPosition="right"
          renderDrawerContent={() => (
            <Box flex={1} mx="$2">
              <HStack
                justifyContent="center"
                alignItems="flex-end"
                space="lg"
                pt="$10"
              >
                <Pressable onPress={pickImage}>
                  <Image
                    source={require("../../assets/images/avatar_default.jpg")}
                    alt="profile picture"
                    size="lg"
                    rounded="$full"
                    borderWidth={1}
                    borderColor="#000"
                  />
                </Pressable>
                <VStack>
                  <Text bold>{userData.username.toUpperCase()}</Text>
                  <Text>{userData.email}</Text>
                </VStack>
              </HStack>

              <HStack
                justifyContent="space-between"
                alignItems="center"
                mt="$10"
                mb="$4"
              >
                <HStack alignItems="flex-end" space="xs">
                  <Ionicons name={"bookmark"} size={20} color={"#FF6F00"} />
                  <Text color="#888" fontSize="$lg">
                    Movies
                  </Text>
                </HStack>
                <Text color="#888" fontSize="$lg">
                  27
                </Text>
              </HStack>
              <Divider />
              <HStack
                justifyContent="space-between"
                alignItems="center"
                mt="$10"
                mb="$4"
              >
                <HStack alignItems="flex-end" space="xs">
                  <Ionicons name={"chatbox"} size={20} color={"#FF6F00"} />
                  <Text color="#888" fontSize="$lg">
                    Comments
                  </Text>
                </HStack>
                <Text color="#888" fontSize="$lg">
                  27
                </Text>
              </HStack>
              <Divider />
              <HStack
                justifyContent="space-between"
                alignItems="center"
                mt="$10"
                mb="$4"
              >
                <HStack alignItems="flex-end" space="xs">
                  <Ionicons name={"flame"} size={20} color={"#FF6F00"} />
                  <Text color="#888" fontSize="$lg">
                    Ratings
                  </Text>
                </HStack>
                <Text color="#888" fontSize="$lg">
                  27
                </Text>
              </HStack>
              <Divider />
              

              <Pressable
                onPress={handleLogout}
                position="absolute"
                top={height * 0.8}
              >
                <Text color="#FF6F00" bold>
                  Log out
                </Text>
              </Pressable>
            </Box>
          )}
        >
          <Box flex={1} mx="$4">
            <HStack my="$4" justifyContent="space-between" alignItems="center">
              <HStack
                justifyContent="space-between"
                alignItems="baseline"
                space="xs"
              >
                <Text color="#fff">Welcome</Text>
                <Text fontSize="$lg" bold color="#fff">
                  {userData.username}
                </Text>
              </HStack>
              <Pressable onPress={() => setOpen((prevOpen) => !prevOpen)}>
                <Image
                  source={require("../../assets/images/avatar_default.jpg")}
                  alt="profile picture"
                  size="xs"
                  rounded="$full"
                />
              </Pressable>
            </HStack>
            <SearchContent />
          </Box>
        </Drawer>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
