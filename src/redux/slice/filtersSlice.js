import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    genres: [],
    certification: [],
    language: [],
    sortBy: 'popularity.asc',
    apiQuery: '',
  },
  reducers: {
    setFilter: (state, action) => {
      return {
        ...state,
        genres: action.payload.genres,
        certification: action.payload.certification,
        language: action.payload.language,
        apiQuery: action.payload.apiQuery,
        sortBy: action.payload.sortBy,
      };
    },
    // setGenres: (state, action) => {
    //   state.genres = action.payload;
    // },
    // setApiQuery: (state, action) => {
    //   state.apiQuery = action.payload;
    // },
    // setCertification: (state, action) => {
    //   state.certification = action.payload;
    // },
    // setLanguage: (state, action) => {
    //   state.language = action.payload;
    // },
    resetFilters: (state) => {
      return {
        genres: [],
        certification: [],
        language: [],
        apiQuery: '',
      };
    },
  },
});

export const { setGenres, setApiQuery, setCertification, setLanguage, resetFilters, setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
