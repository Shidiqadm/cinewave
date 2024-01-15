import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { COLORS, FONTS, SIZES } from '../../constants'
import Appbar from '../../components/Appbar/Appbar'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Label from '../../components/Text/Label'
import { removeFromFavorites } from '../../redux/slice/favoritesSlice'
import { Image } from 'expo-image'
import { URLS } from '../../constants/urls'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

const Favourites = () => {
  const favoritesData = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleItemPress = (data, isTv) => {
    const { id } = data;
    if (!isTv) {
      navigation.navigate('MovieDetails', { movieId: id });
    } else {
      navigation.navigate('ShowDetails', { showId: id });
    }
  };

  const handleRemoveFromFavorites = (item) => {
    dispatch(removeFromFavorites(item));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item, item.name ? true : false)}>
      <View style={{flexDirection: 'row', gap: 12}}>
        <Image
          style={{ width: 60, height: 80, borderRadius: 4 }}
          source={{ uri: URLS.imageBaseUrl + item.poster_path }}
        />
        <View style={{maxWidth: SIZES.screenWidth / 1.8}}>
          <Label variant={FONTS.titleSmall}>{item.title || item.name}</Label>
          <Label variant={FONTS.bodySmall} lineBreakMode="tail" numberOfLines={3} style={{marginTop: 8}}>{item.overview}</Label>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveFromFavorites(item)}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <StatusBar style='inverted' />
      <Appbar title='Favourites' />
      <View style={{flex: 1}}>
        <FlatList
          data={favoritesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}  
        />
      </View>
    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
  },
  removeButton: {
    color: 'red',
  },
})