import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import Label from '../Text/Label'
import { COLORS, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const Appbar = ({title, showFilter=false}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.AppBarContainer}>
      <View style={{flex: 1}}>
        <Label variant={FONTS.titleLarge}>{title}</Label>
      </View>
      {
        showFilter && (
          <View style={{alignSelf: 'flex-end'}}>
            <Pressable onPress={() => navigation.navigate('Filters')}>
              <Ionicons name="filter-sharp" size={24} color={COLORS.primary} />
            </Pressable>
          </View>
        )
      }
    </View>
  )
}

export default Appbar

const styles = StyleSheet.create({
  AppBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  }
})