import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Label from '../Text/Label'
import { COLORS, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const SectionTitle = ({title, onPress}) => {
  const navigation = useNavigation()
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Label variant={FONTS.titleLarge}>{title}</Label>
      <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
        <Label variant={FONTS.bodySmall} color={COLORS.primary}>View All</Label>
      </TouchableOpacity>
    </View>
  )
}

export default SectionTitle

const styles = StyleSheet.create({})