import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextProps {
	showModal: (message: string, isSuccessful: boolean) => void;
	hideModal: () => void;
	isModalVisible: boolean;
	isSuccessful: boolean | undefined;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState<string>("");
	const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

	const showModal = (message: string, isSuccessful: boolean) => {
		setModalMessage(message);
		setIsSuccessful(isSuccessful);
		setModalVisible(true);
	};

	const hideModal = () => {
		setModalVisible(false);
	};

	return (
		<ModalContext.Provider
			value={{ showModal, hideModal, isModalVisible, isSuccessful }}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};
