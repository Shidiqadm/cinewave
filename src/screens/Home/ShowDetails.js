import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { URLS } from '../../constants/urls';
import { COLORS, FONTS, SIZES } from '../../constants';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from 'react-query';
import tmdbService from '../../services/tmdbServices';
import Label from '../../components/Text/Label';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { addToFavorites, removeFromFavorites } from '../../redux/slice/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import SectionTitle from '../../components/titles/SectionTitle';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PrimaryCard from '../../components/cards/PrimaryCard';
import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';

const ShowDetails = ({route}) => {
  const { showId } = route.params;
  const dispatch = useDispatch();
  const {data: showDetails, isLoading, isError} = useQuery(['showDetails', showId], () => tmdbService.fetchShowDetails(showId));
  const {data: similarShows} = useQuery(['similarShows', showId], () => tmdbService.fetchSimilarShows(showId));
  const favoritesData = useSelector((state) => state.favorites);
  const navigation = useNavigation();
  const isItemInFavorites = favoritesData?.some(favoriteItem => favoriteItem?.id === showDetails?.id);

  const handleAddToFavourites = (item) => {
    if (isItemInFavorites) {
      dispatch(removeFromFavorites(item));
      Toast.show({
        type: 'error',
        text1: 'Removed from favorites',
      });
    } else {
      dispatch(addToFavorites(item));
      Toast.show({
        type: 'success',
        text1: 'Added to favorites',
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <PrimaryCard
        title={item.title || item.name}
        imageUrl={`${URLS.imageBaseUrl + item.poster_path}`}
        onPress={() => handleCardPress(item, item.name ? true : false)}
      />
    );
  };

  const handleCardPress = (data, isTv) => {
    const { id } = data;
    if (!isTv) {
      navigation.navigate('MovieDetails', { movieId: id });
    } else {
      navigation.navigate('ShowDetails', { showId: id });
    }
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{position: "relative" }}>
        <View style={{ height: SIZES.windowWidth * 0.8 }}>
          <Image
            source={{ uri: `${URLS.imageBaseUrl + showDetails?.backdrop_path}` }}
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
        <Label variant={FONTS.displaySmall} >{showDetails?.title || showDetails?.name}</Label>
        <Label variant={FONTS.bodyMedium} >{showDetails?.overview}</Label>

        <View style={{marginTop: 20, flexDirection: 'row', gap: 8 * 3}}>
          <Pressable style={{justifyContent: 'center', alignItems: 'center', width: 50, gap: 6}} onPress={() => handleAddToFavourites(showDetails)}>
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
          <SectionTitle title="Similar TV Shows" />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={similarShows}
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

export default ShowDetails

const styles = StyleSheet.create({
  separator: {
    width: 18,
  },
  flatListContainer: { paddingHorizontal: 20 }
})