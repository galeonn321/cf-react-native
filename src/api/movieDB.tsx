import { API_KEY_MOVIES_TMDb } from "@env";
import axios from "axios";

const tmdbAPI = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: API_KEY_MOVIES_TMDb,
	},
});

export default tmdbAPI;
