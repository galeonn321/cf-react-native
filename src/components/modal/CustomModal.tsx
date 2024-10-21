// CustomModal.tsx
import React, { useEffect } from "react";
import {
	Button,
	ButtonText,
	Center,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalContent,
	ModalFooter,
	Text,
} from "@gluestack-ui/themed";
import { LOG } from "../../config/logger";
import { useModal } from "./ModalContext";

interface CustomModalProps {
	message: string;
	isSuccessful?: boolean | undefined;
	children?: React.ReactNode; // Include children here if needed
}

const CustomModal: React.FC<CustomModalProps> = ({ message }) => {
	const { hideModal, isModalVisible, isSuccessful } = useModal();
	const ref = React.useRef(null);

	useEffect(() => {
		LOG.info("CustomModal mounted", isSuccessful);
	}, []);

	return (
		<Center h={300}>
			<Modal
				isOpen={isModalVisible}
				onClose={() => {
					hideModal();
				}}
				finalFocusRef={ref}
			>
				<ModalBackdrop />
				<ModalContent bgColor={"#000"}>
					{/* <ModalHeader alignSelf="center">
            <Heading size="lg">error</Heading>
          </ModalHeader> */}
					<ModalBody>
						<Text alignSelf="center" pt="$10" textAlign="center" color={"#fff"}>
							{message}
						</Text>
					</ModalBody>
					<ModalFooter alignSelf="center">
						<Button
							size="lg"
							bgColor={isSuccessful ? "$emerald700" : "$red900"}
							onPress={() => {
								hideModal();
							}}
						>
							<ButtonText>Ok</ButtonText>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Center>
	);
};

export default CustomModal;
