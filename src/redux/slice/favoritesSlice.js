import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const newItem = action.payload;
      state.push(newItem);
    },
    removeFromFavorites: (state, action) => {
      const { id } = action.payload;
      return state.filter(item => item.id !== id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;