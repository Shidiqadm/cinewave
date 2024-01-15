import { AppRegistry, LogBox, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/components/bottomTab/BottomTab';
import { THEMES } from './src/constants/theme';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux'
import store, { persistor } from './src/redux/store/movieStore';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetails from './src/screens/Home/MovieDetails';
import ShowDetails from './src/screens/Home/ShowDetails';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs();

export default function App() {
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({
    'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
    'Gilroy-Light': require('./assets/fonts/Gilroy-Light.ttf'),
    'Gilroy-Medium': require('./assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
    'Gilroy-SemiBold': require('./assets/fonts/Gilroy-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer theme={THEMES.DefaultCineWaveTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Landing" component={BottomTab} />
              <Stack.Screen name="MovieDetails" component={MovieDetails} />
              <Stack.Screen name="ShowDetails" component={ShowDetails} />
            </Stack.Navigator>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toast position='bottom' />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('App', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
