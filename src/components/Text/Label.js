import { Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../constants'

const Label = ({children, variant = FONTS.bodyLarge, color = COLORS.light, style, align, ...props}) => {
  return (
    <Text style={[variant, {color, textAlign: align}, style]} {...props}>{children}</Text>
  )
}

export default Label