import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "../../constants";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockData } from "../../../mockData";
import { URLS } from "../../constants/urls";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/button/Button";
import SectionTitle from "../../components/titles/SectionTitle";
import PrimaryCard from "../../components/cards/PrimaryCard";
import { useDispatch, useSelector } from "react-redux";
import tmdbService from "../../services/tmdbServices";
import { fetchMoviesFailure, fetchMoviesStart, fetchMoviesSuccess } from "../../redux/slice/movieSlice";
import WideBannerCard from "../../components/cards/WideCard";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, tvShows, topShows, topMovies, upcomingMovies, loading, error } = useSelector((state) => state.movieList);
  const navigation = useNavigation();
  const [currentItem, setCurrentItem] = useState(mockData.results[0]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(fetchMoviesStart());
        const moviesData = await tmdbService.fetchPopularMovies();
        const tvShowsData = await tmdbService.fetchPopularTvShows();
        const topShowsData = await tmdbService.fetchTopRatedShows();
        const topMoviesData = await tmdbService.fetchTopRatedMovies();
        const upcomingMovies = await tmdbService.fetchUpcomingMovies();
        dispatch(fetchMoviesSuccess({movies: moviesData, tvShows: tvShowsData, topShows: topShowsData, topMovies: topMoviesData, upcomingMovies}));
      } catch (err) {
        dispatch(fetchMoviesFailure(err.message));
      }
    };

    fetchMovies();
  }, [dispatch]);

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
  
  const renderNewItem = ({ item, index }) => {
    return (
      <WideBannerCard
        title={item.title || item.name}
        imageUrl={`${URLS.imageBaseUrl + item.backdrop_path}`}
      />
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["left", "right"]}
    >
      <StatusBar style="inverted" />
      {/* <Appbar title='Home' /> */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{paddingBottom: 40}}>
        <View style={{position: "relative" }}>
          <Carousel
            loop
            width={SIZES.windowWidth}
            height={SIZES.windowWidth * 1.25}
            autoPlay={true}
            data={mockData.results}
            scrollAnimationDuration={1000}
            autoPlayInterval={5000}
            onSnapToItem={(index) => setCurrentItem(mockData.results[index])}
            renderItem={({ item, index }) => (
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: `${URLS.imageBaseUrl + item.poster_path}` }}
                  style={{ flex: 1, justifyContent: "flex-end" }}
                  contentFit="cover"
                  transition={1000}
                />
                <LinearGradient
                  colors={['rgba(18, 18, 18, 0.4)', 'rgba(18, 18, 18, 1)']}
                  style={StyleSheet.absoluteFill}
                />
              </View>
            )}
          />
          <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, flexDirection: 'row', gap: 16 }}>
            <View style={{flex: 1}}>
              <Button iconFront={<AntDesign name={"plus"} size={20} color={COLORS.light} />} onPress={() => handleCardPress(currentItem, currentItem.name ? true : false)}>Watchlist</Button>
            </View>
            <View style={{flex: 1}}>
              <Button iconFront={<Feather name="info" size={20} color={COLORS.light} />} onPress={() => handleCardPress(currentItem, currentItem.name ? true : false)}>Details</Button>
            </View>
          </View>
        </View>
        <View>
          <View style={{marginTop: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <SectionTitle title="Discover Movies" />
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                data={movies}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(item) => item.title}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <SectionTitle title="Upcoming Movies" onPress={() => navigation.navigate('Discover', { type: 'discover' })} />
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                data={upcomingMovies}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(item) => item.title}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <SectionTitle title="Discover Tv Shows" />
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                data={tvShows}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(item) => item.title}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <SectionTitle title="Top Rated Shows" />
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                data={topShows}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(item) => item.title}
                renderItem={renderNewItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <SectionTitle title="Top Rated Movies" />
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                data={topMovies}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(item) => item.title}
                renderItem={renderNewItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  separator: {
    width: 18,
  },
  flatListContainer: { paddingHorizontal: 20 }
});
