import { LOG } from "../config/logger";
import { getTokenFromUser, setTokenToUser } from "../services/user.services";
import type { User, UserLogin } from "../types/interfaces";
import type {
	AuthenticateUserResponse,
	RegisterResponse,
} from "../types/responseTypes";

import axios, { AxiosResponse } from "axios";

const API_URL_REGISTER = "http://192.168.1.179:3000/api/auth/register";
const API_URL_LOGIN = "http://192.168.1.179:3000/api/auth/login";
const API_URL_LOGOUT = "http://192.168.1.179:3000/api/auth/logout";
const API_URL_GET_USER_BY_ID = "http://192.168.1.179:3000/api/auth/getUserById";

export const registerUser = async (user: User) => {
	try {
		LOG.info("Registering user...:", user);
		const resp = await fetch(API_URL_REGISTER, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data: RegisterResponse = await resp.json();

		console.log(data);
		return data;
	} catch (error) {
		LOG.error(`Error in registerUser: ${error}`);
	}
};

export const loginUser = async (user: UserLogin) => {
	try {
		const resp = await fetch(API_URL_LOGIN, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await resp.json();

		if (data.ok === true) {
			await setTokenToUser(data.data.token);
		} else {
			("token could not be created");
		}
		return data;
	} catch (error) {
		LOG.error(error, "Error in loginUser function of auth");
	}
};

export const authenticateUser =
	async (): Promise<AuthenticateUserResponse | null> => {
		try {
			const token = await getTokenFromUser();

			if (!token) {
				LOG.info("No token found for authentication.");
				return null;
			}

			const response = await axios.post<AuthenticateUserResponse>(
				API_URL_GET_USER_BY_ID,
				{ token },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			return response.data;
		} catch (error) {
			LOG.error("Error in authenticateUser:", error);
			return null;
		}
	};

export const logoutUser = async () => {};
