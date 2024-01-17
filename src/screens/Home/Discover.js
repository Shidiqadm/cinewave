import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import tmdbService from '../../services/tmdbServices'
import { Image } from 'expo-image'
import { URLS } from '../../constants/urls'
import { useNavigation } from '@react-navigation/native'
import Appbar from '../../components/Appbar/Appbar'
import { useSelector } from 'react-redux'

const Discover = ({route}) => {
  const navigation = useNavigation();
  const apiQueryRedux = useSelector((state) => state.filters.apiQuery);

  console.log(apiQueryRedux);

  const {
    data: similarMovies,
    isFetchingNextPage,
    status,
  } = useQuery(
    ['similarMovies', apiQueryRedux],
    ({ pageParam = 1 }) => tmdbService.fetchDiscoverMovies(apiQueryRedux),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
      },
    }
  );  

  console.log(status);

  const handleCardPress = (data, isTv) => {
    const { id } = data;
    if (!isTv) {
      navigation.navigate('MovieDetails', { movieId: id });
    } else {
      navigation.navigate('ShowDetails', { showId: id });
    }
  }

  const renderPosterItem = ({ item }) => (
    <Pressable
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 16,
        display: "inline-flex",
      }}
      onPress={() => handleCardPress(item, item.name ? true : false)}
    >
      <Image
        style={{ width: 110, height: 150, borderRadius: 8 }}
        source={{ uri: URLS.imageBaseUrl+item.poster_path }}
      />
    </Pressable>
  );

  return (
    <SafeAreaView>
      <StatusBar style='inverted' />
      <Appbar title='Discover' showFilter />
      <ScrollView>
        <FlatList
          data={similarMovies}
          horizontal={false}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPosterItem}
          ListFooterComponent={() => isFetchingNextPage && <ActivityIndicator style={styles.loader} />}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Discover

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12
  }
})