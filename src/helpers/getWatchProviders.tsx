import tmdbAPI from "../api/movieDB";
import { LOG } from "../config/logger";
import { WatchProviderMapper } from "../mapper/watchProvider.mapper";
import type { WatchProvider } from "../types/watchProviders";

export const getWatchProviders = async (movieId: number) => {
	try {
		LOG.info(movieId);
		const { data } = await tmdbAPI.get<WatchProvider>(`/movie/${movieId}/watch/providers`);

		// LOG.info(data)
		// const providers = data.results.map((provider: WatchProvider) => WatchProviderMapper.WatchProviderToEntity(provider))
	} catch (error) {
		LOG.error(error);
	}
};
