import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import Label from '../Text/Label'
import { FONTS, SIZES } from '../../constants'

const WideBannerCard = ({title, imageUrl='https://image.tmdb.org/t/p/w500/aTPMj3Bqb0WfHsIv8zUOROSjb7S.jpg'}) => {
  return (
    <View style={{width: SIZES.screenWidth - 40, flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
      <Image style={{width: SIZES.screenWidth - 40, height: 160, borderRadius: 8}} source={{ uri: imageUrl}} />
      <Label style={{alignSelf: 'stretch', color: '#E0E0E0'}} lineBreakMode='tail' numberOfLines={1} variant={FONTS.titleSmall}>{title}</Label>
    </View>
  )
}

export default WideBannerCard

const styles = StyleSheet.create({})