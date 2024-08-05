import { Dimensions, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchContent from "../components/searchContent/SearchContent";
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
} from "@gluestack-ui/themed";

import { useEffect, useState } from "react";
import { Drawer } from "react-native-drawer-layout";
import { removeTokenFromUser } from "../services/user.services";
import { setAuthStatus } from "../lib/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LOG } from "../config/logger";
import { removeUser } from "../lib/redux/slices/userSlice";

const { height } = Dimensions.get("screen");

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.user);

  const handleLogout = async () => {
    await removeTokenFromUser();
    dispatch(removeUser());
    dispatch(setAuthStatus({ isAuthenticated: false }));
  };

  useEffect(() => {
    LOG.warn(userData,`esto es lo que traje?`);
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ paddingTop: insets.top, backgroundColor: "#000" }}
      >
        <Drawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          drawerStyle={{
            height: height,
            backgroundColor: "#F7F9F2",
          }}
          drawerPosition="right"
          renderDrawerContent={() => (
            <Center bgColor="#F7F9F2">
              <Image
                source={require("../../assets/images/avatar_default.jpg")}
                alt="profile picture"
                size="lg"
                rounded="$full"
                mt="$8"
              />
              <Pressable onPress={handleLogout}>
                <Text>Log out</Text>
              </Pressable>
            </Center>
          )}
        >
          <Box flex={1} mx="$4">
            <HStack my="$4" justifyContent="space-between" alignItems="center">
              <HStack
                justifyContent="space-between"
                alignItems="baseline"
                space="sm"
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
