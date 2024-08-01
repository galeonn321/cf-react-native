import { API_KEY_MOVIES_TMDb } from "@env";
import axios from "axios";

const movieDB = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: {
    api_key: API_KEY_MOVIES_TMDb,
    language: "en-US",
  },
});

export default movieDB;
