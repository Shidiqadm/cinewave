import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Label from '../Text/Label'
import { COLORS, FONTS } from '../../constants'

const SectionTitle = ({title}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Label variant={FONTS.titleLarge}>{title}</Label>
      <TouchableOpacity>
        <Label variant={FONTS.bodySmall} color={COLORS.primary}>View All</Label>
      </TouchableOpacity>
    </View>
  )
}

export default SectionTitle

const styles = StyleSheet.create({})