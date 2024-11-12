import tmdbAPI from "../api/movieDB";
import { LOG } from "../config/logger";
import type { WatchProviders } from "../types/watchProviders";

export const getWatchProviders = async (movieId: number) => {
    try {
        const providers: WatchProviders = await tmdbAPI.get(`/movie/${movieId}/watch/providers`);
        LOG.info(providers);
    } catch (error) {
        LOG.error(error);
    }
};
