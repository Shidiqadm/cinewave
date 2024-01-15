import { createSlice } from '@reduxjs/toolkit';

const movieListSlice = createSlice({
  name: 'movieList',
  initialState: {
    movies: [],
    tvShows: [],
    topShows: [],
    topMovies: [],
    upcomingMovies: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action) {
      state.movies = action.payload.movies;
      state.tvShows = action.payload.tvShows;
      state.topShows = action.payload.topShows;
      state.topMovies = action.payload.topMovies;
      state.upcomingMovies = action.payload.upcomingMovies;
      state.loading = false;
    },
    fetchMoviesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } = movieListSlice.actions;
export default movieListSlice.reducer;