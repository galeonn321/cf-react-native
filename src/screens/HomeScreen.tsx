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

import { useState } from "react";
import { Drawer } from "react-native-drawer-layout";
import { removeTokenFromUser } from "../services/user.services";
import { setAuthStatus } from "../lib/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LOG } from "../config/logger";

const { height } = Dimensions.get("screen");

const HomeScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const cars = "rengoku";
  const [open, setOpen] = useState<boolean>(false);
  const userData = useSelector((state:any)=>state.user)

  const handleLogout = async () => {
    await removeTokenFromUser();
    dispatch(setAuthStatus({ isAuthenticated: false }));
  };

  LOG.error(userData)

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
            <HStack my="$4" justifyContent="space-between" alignItems="center" >
              <Text color="#fff">Welcome back {cars}</Text>
              <Pressable onPress={() => setOpen((prevOpen) => !prevOpen)}>
                <Image
                  source={require("../../assets/images/avatar_default.jpg")}
                  alt="profile picture"
                  size="2xs"
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
