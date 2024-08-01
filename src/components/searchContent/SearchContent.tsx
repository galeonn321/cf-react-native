import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  InputField,
  InputIcon,
  Pressable,
  Text,
  Image,
  Spinner,
  Divider,
} from "@gluestack-ui/themed";
import { LOG } from "../../config/logger";
import searchMovieDB from "../../api/searchMovieDB";
import { FlashList } from "@shopify/flash-list";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, View } from "react-native";
import { Movie } from "../../types/movieInterface";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMovie } from "../../helpers/addHelpers";

const { height, width } = Dimensions.get("screen");

const SearchContent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [inputText, setInputText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const movieSearch = async () => {
    try {
      setIsLoading(true);
      const results = await searchMovieDB(inputText);
      setSearchResults(results);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    movieSearch();
  }, [inputText]);

  const verifyMovieExists = async (filmItem: Movie) => {
    try {
      const findMovie = new Promise((resolve, reject) => {
        createMovie(filmItem)
          .then((result) => {
            resolve(result);
          })
          .catch((error: any) => {
            LOG.info("entre al primer catch de error wtf", error);
            setIsLoading(false);
            reject(error);
          });
      });

      findMovie.then((result: any) => {
        if (result.ok) {
          LOG.debug("resultado esta ok", result, filmItem);

          navigation.navigate("DetailMovie", { filmItem: filmItem });
        }
      });
    } catch (error) {
      LOG.error(error);
    }
  };

  const renderItem = (item: any, index: any) => {
    const uri = item.item?.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.item?.poster_path}`
      : "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80";

    return (
      <Pressable onPress={() => verifyMovieExists(item.item)}>
        <Image
          height={300}
          size={"2xl"}
          borderRadius={32}
          source={{
            uri: uri,
          }}
          resizeMode="cover"
          alt="miniature example"
          mx="$4"
          role="presentation"
          sx={{ ":pressed": { backgroundColor: "#fff" } }}
        />
        <Text
          color="#fff"
          mx="$4"
          italic
          fontWeight="700"
          textAlign="center"
          fontSize={"$2xl"}
          py={"$6"}
          maxWidth={"$72"}
        >
          {item.item.title}
        </Text>
      </Pressable>
    );
  };

  return (
    <Box bgColor="#000">
      <Heading
        color="#fff"
        fontWeight="$extrabold"
        fontSize={"$md"}
      >
        type the film you are looking for..
      </Heading>

      <Input
        bgColor={"$warmGray700"}
        borderColor="#fff"
        borderWidth={0.5}
        borderRadius={"$full"}
        my="$2"
        alignItems="center"
        px={"$2"}
      >
        <AntDesign name="search1" size={20} color="white" />
        <InputField
          onChangeText={(text: string) => setInputText(text)}
          value={inputText}
          color="#fff"
          placeholder="Titanic, Frozen, Eyes Wide Shut.."
          selectionColor={"#fff"}
        />
        {inputText.length > 0 && (
          <Pressable onPress={() => setInputText("")}>
            <Ionicons name={"close-outline"} size={25} color={"#fff"} />
          </Pressable>
        )}
      </Input>
      {isLoading ? (
        <Box
          w="$32"
          h="$32"
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          mt="$12"
          minHeight={"$10"}
        >
          <Spinner size={"large"} />
        </Box>
      ) : (
        <Box h={height / 2.2}>
          <FlashList
            data={searchResults as any}
            horizontal
            renderItem={renderItem as any}
            estimatedItemSize={350}
            estimatedListSize={{ height: 350, width: width }}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchContent;
