import { Pressable, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../../constants'
import { useDebounce } from 'use-debounce'
import tmdbService from '../../services/tmdbServices'
import { useQuery } from 'react-query'
import { FlatList } from 'react-native-gesture-handler'
import { URLS } from '../../constants/urls'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const navigation = useNavigation();

  const { data: searchResults, isLoading, isError } = useQuery(['searchMovies', debouncedSearchTerm], () => tmdbService.fetchSearchResultsByQuery(debouncedSearchTerm), {
    enabled: !!debouncedSearchTerm
  })

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
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <StatusBar style='inverted' />
      {/* <Appbar title='Search' /> */}
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 20}}>
          <TextInput
            style={{backgroundColor: COLORS.backgroundSecondary, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, color: COLORS.light}}
            placeholder='Search'
            placeholderTextColor={COLORS.background}
            selectionColor={COLORS.primary}
            onChangeText={setSearchTerm}
          />
        </View>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPosterItem}
          contentContainerStyle={styles.flatListContainer}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12
  },
})