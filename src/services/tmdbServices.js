import axios from "axios";

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGY4NGJiNzU1MzhiOGIwYTEwMmQyNDkyMjkwMzQ0ZCIsInN1YiI6IjYwNTg5ZTRjNmJkZWMzMDA3NWI1NWFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Mox9zrtG4Ygys455UmRaEtD5Cxs6aseRR1Pk7StlJI";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization:
    `Bearer ${TMDB_API_KEY}`,
};

const fetchPopularMovies = async () => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
    headers
  });
  return response.data.results;
};

const fetchPopularTvShows = async () => {
  const response = await axios.get(`${TMDB_BASE_URL}/tv/popular`, {
    headers
  });
  return response.data.results;
};

const fetchTopRatedShows = async () => {
  const response = await axios.get(`${TMDB_BASE_URL}/tv/top_rated`, {
    headers
  });
  return response.data.results;
};

const fetchTopRatedMovies = async () => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
    headers
  });
  return response.data.results;
};

const fetchUpcomingMovies = async () => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/upcoming`, {
    headers
  });
  return response.data.results;
};

const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
    headers
  });
  return response.data;
};

const fetchShowDetails = async (showId) => {
  const response = await axios.get(`${TMDB_BASE_URL}/tv/${showId}`, {
    headers
  });
  return response.data;
};

const fetchSimilarMovies = async (movieId) => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/similar`, {
    headers
  });
  return response.data.results;
};

const fetchSimilarShows = async (showId) => {
  const response = await axios.get(`${TMDB_BASE_URL}/tv/${showId}/similar`, {
    headers
  });
  return response.data.results;
};

const fetchSearchResultsByQuery = async (query) => {
  const response = await axios.get(`${TMDB_BASE_URL}/search/multi?query=${query}`, {
    headers
  });
  return response.data.results;
};

const tmdbService = {
  fetchPopularMovies,
  fetchMovieDetails,
  fetchPopularTvShows,
  fetchTopRatedShows,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchShowDetails,
  fetchSimilarMovies,
  fetchSimilarShows,
  fetchSearchResultsByQuery
};

export default tmdbService;
