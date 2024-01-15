import { StyleSheet, View } from 'react-native'
import React from 'react'
import Label from '../Text/Label'
import { COLORS, FONTS } from '../../constants'

const Appbar = ({title}) => {
  return (
    <View style={styles.AppBarContainer}>
      <Label variant={FONTS.titleLarge}>{title}</Label>
    </View>
  )
}

export default Appbar

const styles = StyleSheet.create({
  AppBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  }
})