import { LOG } from "../config/logger";
import type { Movie } from "../types/movieInterface";
import type { ResponseMovieExists } from "../types/responseTypes";

const API_URL_CREATE_MOVIE = "http://192.168.1.179:3000/api/movies/createMovie";
const API_URL_ADD_COMMENT = "http://192.168.1.179:3000/api/movies/addComment";
const API_URL_RATE_MOVIE = "http://192.168.1.179:3000/api/movies/rateMovie";

export const createMovie = async (movie: Movie) => {
	try {
		const resp = await fetch(API_URL_CREATE_MOVIE, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(movie),
		});

		const data: ResponseMovieExists = await resp.json();

		LOG.debug(data);

		return data;
	} catch (error) {
		LOG.error(`Error in registerUser: ${error}`);
	}
};

// export const addComment = async () => {};

// export const rateMovie = async () => {};

// export const checkIfMovieExists = async (movie: Movie) => {};
