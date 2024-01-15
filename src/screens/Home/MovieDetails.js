import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { URLS } from '../../constants/urls';
import { COLORS, FONTS, SIZES } from '../../constants';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from 'react-query';
import tmdbService from '../../services/tmdbServices';
import Label from '../../components/Text/Label';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import SectionTitle from '../../components/titles/SectionTitle';
import { useNavigation } from '@react-navigation/native';
import PrimaryCard from '../../components/cards/PrimaryCard';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/slice/favoritesSlice';
import Toast from 'react-native-toast-message';

const MovieDetails = ({route}) => {
  const { movieId } = route.params;
  const {data: movieDetails, isLoading, isError} = useQuery(['movieDetails', movieId], () => tmdbService.fetchMovieDetails(movieId));
  const {data: similarMovies} = useQuery(['similarMovies', movieId], () => tmdbService.fetchSimilarMovies(movieId));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoritesData = useSelector((state) => state.favorites);
  const isItemInFavorites = favoritesData?.some(favoriteItem => favoriteItem?.id === movieDetails?.id);

  const handleCardPress = (data, isTv) => {
    const { id } = data;
    if (!isTv) {
      navigation.navigate('MovieDetails', { movieId: id });
    } else {
      navigation.navigate('ShowDetails', { showId: id });
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <PrimaryCard
        title={item.title || item.name}
        imageUrl={`${URLS.imageBaseUrl + item.poster_path}`}
        onPress={() => handleCardPress(item, item.name ? true : false)}
      />
    );
  };

  const handleAddToFavourites = (item) => {
    if (isItemInFavorites) {
      Toast.show({
        type: 'error',
        text1: 'Removed from favorites',
      });
      dispatch(removeFromFavorites(item));
    } else {
      Toast.show({
        type: 'success',
        text1: 'Added to favorites',
      });
      dispatch(addToFavorites(item));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{position: "relative" }}>
        <View style={{ height: SIZES.windowWidth * 0.8 }}>
          <Image
            source={{ uri: `${URLS.imageBaseUrl + movieDetails?.backdrop_path}` }}
            style={{ flex: 1, justifyContent: "flex-end" }}
            contentFit="cover"
            transition={1000}
          />
          <LinearGradient
            colors={['rgba(18, 18, 18, 0.4)', 'rgba(18, 18, 18, 1)']}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Label variant={FONTS.displaySmall} >{movieDetails?.title || movieDetails?.name}</Label>
        <Label variant={FONTS.bodyMedium} >{movieDetails?.overview}</Label>

        <View style={{marginTop: 20, flexDirection: 'row', gap: 8 * 3}}>
          <Pressable style={{justifyContent: 'center', alignItems: 'center', width: 50, gap: 6}} onPress={() => handleAddToFavourites(movieDetails)}>
            <AntDesign name={isItemInFavorites ? "close" : "plus"} size={24} color={COLORS.light} />
            <Label variant={FONTS.caption} color={'#737373'}>{isItemInFavorites ? 'Remove' : 'My List'}</Label>
          </Pressable>
          <View style={{justifyContent: 'center', alignItems: 'center', width: 50, gap: 6}}>
            <Ionicons name="paper-plane-outline" size={24} color={COLORS.light} />
            <Label variant={FONTS.caption} color={'#737373'}>Share</Label>
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <View style={{paddingHorizontal: 20}}>
          <SectionTitle title="Similar Movies" />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={similarMovies}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default MovieDetails

const styles = StyleSheet.create({
  separator: {
    width: 18,
  },
  flatListContainer: { paddingHorizontal: 20 }
})