import type { Movie } from "./movieInterface";

// Unified User Interface
export interface User {
	__v: number;
	_id: string;
	comments: any[];
	createdAt: number;
	email: string;
	likes: any[];
	password?: string;
	savedMovies: any[];
	updatedAt: number;
	userId: string;
	username: string;
	location?: string;
}

export interface RegisterResponse {
	data: {
		newUser: User;
	};
	message: string;
	ok: boolean;
}

export interface AuthenticateUserResponse {
	ok: boolean;
	data?: User;
	message?: string;
}

export interface UserValidationResult {
	ok: boolean;
	message: string;
	data: Data;
}

export interface Data {
	token: string;
}

export interface ResponseMovieExists {
	ok: boolean;
	message: string;
	data: string | Movie;
}
