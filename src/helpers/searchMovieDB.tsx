import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movieInterface";
import tmdbAPI from "../api/movieDB";

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
