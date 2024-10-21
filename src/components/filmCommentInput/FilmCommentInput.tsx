import {
	Button,
	FormControlLabelText,
	Input,
	InputField,
	Pressable,
	Text,
	Textarea,
	TextareaInput,
} from "@gluestack-ui/themed";
import React, { useState } from "react";

import { EvilIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { FormControlLabel } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { LOG } from "../../config/logger";

const FilmCommentInput = () => {
	const [inputText, setInputText] = useState<string>("");

	return (
		<>
			<FormControlLabel>
				<FormControlLabelText>
					Add your thought about the film
				</FormControlLabelText>
			</FormControlLabel>
			<Textarea bgColor={"#fff"} borderColor="#000">
				<TextareaInput
					onChangeText={(text: string) => setInputText(text)}
					value={inputText}
					placeholder="comment..."
					mr={"$8"}
				/>

				{inputText.length > 0 && (
					<Pressable
						onPress={() => setInputText("")}
						mr="$2"
						position="absolute"
						right={"$0"}
						top={"$1"}
					>
						<AntDesign name="closesquare" size={25} color={"#000"} />
					</Pressable>
				)}
			</Textarea>
			<Text alignSelf="flex-end">{inputText.length}/300</Text>
			<Button
				mt="$2"
				size="sm"
				variant="solid"
				action="primary"
				isDisabled={
					inputText.length < 0 || inputText.length === 301 ? true : false
				}
				elevation={"$1"}
				bgColor="#000"
			>
				<ButtonText mr="$2">Send Comment</ButtonText>
				<FontAwesome name="send" size={12} color={"#fff"} />
			</Button>
			{inputText.length < 0 || inputText.length === 301 ? (
				<Text fontSize="$xs" color="red">
					Cannot write comments longer that 300
				</Text>
			) : (
				<></>
			)}
		</>
	);
};

export default FilmCommentInput;
