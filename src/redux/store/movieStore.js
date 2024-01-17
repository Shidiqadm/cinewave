import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import movieListReducer from '../slice/movieSlice';
import favoritesReducer from '../slice/favoritesSlice';
import filtersReducer from '../slice/filtersSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  movieList: movieListReducer,
  favorites: favoritesReducer,
  filters: filtersReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;