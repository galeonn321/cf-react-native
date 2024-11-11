import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movieInterface";
import { API_KEY_MOVIES_TMDb } from "@env";

const tmdbAPI = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: API_KEY_MOVIES_TMDb,
	},
});

type MovieApiResponse = Movie | { results: Movie[] };

const isMovieArray = (data: MovieApiResponse): data is { results: Movie[] } => {
	return "results" in data;
};

const searchMovieDB = async (query: string): Promise<Movie[]> => {
	try {
		const response: AxiosResponse<Movie | { results: Movie[] }> =
			await tmdbAPI.get("/search/movie", {
				params: {
					query: query,
				},
			});

		if (response.status === 200) {
			const movies: Movie[] = isMovieArray(response.data)
				? response.data.results
				: [response.data];

			return movies;
		}

		throw new Error(`API request failed with status: ${response.status}`);
	} catch (error) {
		throw new Error(`API request error: ${error}`);
	}
};

export default searchMovieDB;
