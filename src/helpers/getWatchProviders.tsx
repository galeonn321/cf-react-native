import tmdbAPI from "../api/movieDB";
import { LOG } from "../config/logger";
import { WatchProviderMapper } from "../mapper/watchProvider.mapper";
import type { WatchProvider } from "../types/watchProviders";
import { getCurrentLocation } from "./getCurrentLocation";

export const getWatchProviders = async (movieId: number) => {
	try {
		LOG.info(movieId);

		const location = await getCurrentLocation();

		// const { data } = await tmdbAPI.get<WatchProvider>(
		// 	`/movie/${movieId}/watch/providers`
		// );

		// const providers = Object.values(data.results).map((provider) => Object.values());
	} catch (error) {
		LOG.error(error);
	}
};
