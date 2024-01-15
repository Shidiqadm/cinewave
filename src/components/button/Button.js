import React from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants';
import { Label } from '../bottomTab/UIComponents';

const Button = ({ size = 'medium', variant = 'filled', iconFront, iconRear, children, onPress, color='primary', customStyles, textStyle, loading, backgroundColor }) => {
  const sizes = {
    small: { 
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 4,
      minWidth: iconFront || iconRear ? 79 : 59,
      height: 32,
    },
    medium: { 
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 4,
      minWidth: iconFront || iconRear ? 98 : 72,
      height: 44
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 4,
      minWidth: iconFront || iconRear ? 114 : 84,
      height: 56
    },
  };

  const variants = {
    filled: {
      backgroundColor: color ? COLORS[color] : COLORS.primary,
      color: 'white',
    },
    subtle: {
      backgroundColor: COLORS.primarySubtle,
      color: COLORS.primary,
    },
    text: {
      backgroundColor: 'transparent',
      color: COLORS.primary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: COLORS.primary,
      borderWidth: 1,
      color: COLORS.primary,
    },
  };

  const handleTextVariant = () => {
    if (size === 'small') {
      return 'labelSmall';
    }
    if (size === 'medium') {
      return 'labelMedium';
    }
    if (size === 'large') {
      return 'labelLarge';
    }
  }

  const handleIconSize = () => {
    if (size === 'small') {
      return 16;
    }
    if (size === 'medium') {
      return 20;
    }
    if (size === 'large') {
      return 24;
    }
  }

  const sizeStyle = sizes[size];
  const variantStyle = variants[variant];

  const combinedStyle = {
    ...sizeStyle,
    ...variantStyle,
    ...customStyles,
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={loading}>
      <View style={[styles.button, combinedStyle, {backgroundColor: backgroundColor}]}>
        {iconFront}
        {
          loading ?
          <ActivityIndicator size='small' color={COLORS.light} /> :
          <Label style={[styles.text, { color: variantStyle.color }, {...textStyle}]} variant={handleTextVariant()}>{children}</Label>
        }
        {/* {iconRear && <Icon name={iconRear} size={handleIconSize()} color={variantStyle.color} />} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default Button;
