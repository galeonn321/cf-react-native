import React from "react";
import { Text, Box, Image, HStack, VStack } from "@gluestack-ui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";

const CommentItem = () => {
	// const [isTruncated, setIsTruncated] = useState(false);

	// const seeMore = () => {
	//     setIsTruncated(!isTruncated);
	// }

	return (
		<Box mt="$2">
			<Box
				borderColor="#000"
				borderWidth={0.3}
				borderRadius={"$2xl"}
				minHeight={"$24"}
			>
				<HStack mt="$3" ml="$3" space="2xl">
					<Image
						size="xs"
						borderRadius={100}
						role="presentation"
						source={{
							uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
						}}
						alt="profilepicturecomment"
					/>
					<VStack>
						<Text color="#000" fontWeight="$bold" fontSize={"$lg"}>
							Kimki
						</Text>
						<Text color="#707070" fontSize={"$xs"}>
							5 hours ago
						</Text>

						<Text color="#000" fontSize={"$sm"} maxWidth={"$64"}>
							Contrary to popular belief, Lorem Ipsum is not simply random text.
							It has roots in a piece of classical Latin literature from 45 BC,
							making it over 2000 years old. Richard McClintock, a Latin
							professor at Hampden-Sydney College in Virginia, looked up one of
							the more obscure Latin words, consectetur, from a Lorem Ipsum
							passage, and going through the cites of the word .
						</Text>

						<Text mb="$4" color="#000" fontWeight="800" textAlign="right">
							See more
						</Text>

						<HStack mb="$4">
							<Text
								color="#000"
								fontWeight="$bold"
								fontSize={"$sm"}
								maxWidth={"$64"}
								alignSelf="flex-end"
							>
								Reply ·{" "}
							</Text>
							<Text
								color="#000"
								fontSize={"$sm"}
								maxWidth={"$64"}
								alignSelf="flex-end"
							>
								Show 2 replies
							</Text>
						</HStack>
					</VStack>
					<Box position="absolute" right="$4" alignItems="center">
						<Ionicons name={"heart-outline"} size={24} color={"#000"} />
						<Text fontSize={"$xs"}>1.2m</Text>
					</Box>
				</HStack>
			</Box>
		</Box>
	);
};

export default CommentItem;
