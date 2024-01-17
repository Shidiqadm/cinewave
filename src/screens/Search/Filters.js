import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Appbar from "../../components/Appbar/Appbar";
import { COLORS, FONTS } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { certification, genres, languages, sortBy } from "../../../mockData";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFilter } from "../../redux/slice/filtersSlice";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Label from "../../components/Text/Label";

const Filters = () => {
  const [genresState, setGenresState] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [lang, setLang] = useState([]);
  const [sort, setSort] = useState('');
  const genresStateRedux = useSelector((state) => state.filters.genres);
  const certificationRedux = useSelector(
    (state) => state.filters.certification
  );
  const languageRedux = useSelector((state) => state.filters.language);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const buildApiQuery = () => {
    let apiQuery = "";
    const includeAdult = false;
    const includeVideo = false;
    // const language = 'en-US';
    const page = 1;
    const sortBy = "popularity.desc";

    // Convert array values to comma-separated strings
    const genres = genresState.join(",");
    const certifications = certificate.join(",");
    const languages = lang.join(",");

    // Build the API query string
    apiQuery = `?include_adult=${includeAdult}&include_video=${includeVideo}&page=${page}&sort_by=${sortBy}`;

    // Add filters to the query if they are selected
    if (genres.length > 0) {
      apiQuery += `&with_genres=${genres}`;
    }

    if (certifications.length > 0) {
      apiQuery += `&certification=${certifications}`;
    }

    if (languages.length > 0) {
      apiQuery += `&language=${languages}`;
    }

    return apiQuery;
  };

  const handleApplyFilters = () => {
    const apiQuery = buildApiQuery();
    dispatch(
      setFilter({
        genres: genresState,
        certification: certificate,
        language: lang,
        sortBy: sort,
        apiQuery,
      })
    );
    navigation.goBack();
    Toast.show({
      type: "success",
      text1: "Filters applied",
    });
  };

  const handleRemoveFilters = () => {
    dispatch(resetFilters());
    navigation.goBack();
    Toast.show({
      type: "error",
      text1: "Filters removed",
    });
  }

  useEffect(() => {
    setGenresState(genresStateRedux);
    setCertificate(certificationRedux);
    setLang(languageRedux);
    setSort(sortBy);
  }, [genresStateRedux, certificationRedux, languageRedux, sortBy]);

  return (
    <View style={{ backgroundColor: COLORS.backgroundSecondary, flex: 1 }}>
      <Appbar title="Filters" />

      <ScrollView>
        <View style={styles.section}>
          <View>
            <Label style={styles.sectionTitle}>Genres</Label>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={genres}
              labelField="name"
              valueField="id"
              placeholder="Select Genres"
              searchPlaceholder="Search..."
              value={genresState}
              onChange={(item) => {
                setGenresState(item);
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Label style={styles.sectionTitle}>Certification</Label>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={certification}
              labelField="label"
              valueField="value"
              placeholder="Select Certification"
              searchPlaceholder="Search..."
              value={certificate}
              onChange={(item) => {
                setCertificate(item);
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Label style={styles.sectionTitle}>Language</Label>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={languages}
              labelField="label"
              valueField="value"
              placeholder="Select Language"
              searchPlaceholder="Search..."
              value={lang}
              onChange={(item) => {
                setLang(item);
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Label style={styles.sectionTitle}>Sort By</Label>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={{color: COLORS.light}}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={sortBy}
              labelField="label"
              valueField="value"
              placeholder="Select Language"
              searchPlaceholder="Search..."
              value={sort}
              onChange={(item) => {
                setSort(item);
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: 60}} onPress={handleRemoveFilters}>
          <Label color={COLORS.primary}>Remove all filters</Label>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 4,
            backgroundColor: COLORS.primary,
            height: 64,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleApplyFilters}
        >
          <Label color={COLORS.background}>Apply Filter</Label>
        </TouchableOpacity>
        {/* <Button color={COLORS.primary} onPress={handleApplyFilters}>Apply Filters</Button> */}
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderColor: "gray",
    borderRadius: 6,
    borderWidth: 0.5,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
    ...FONTS.caption,
    color: COLORS.background,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    borderWidth: 0,
  },
  section: {
    paddingHorizontal: 20,
  },
});
