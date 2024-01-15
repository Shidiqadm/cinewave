import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Appbar from '../../components/Appbar/Appbar'
import { COLORS } from '../../constants'

const Profile = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <StatusBar style='inverted' />
      <Appbar title='Profile' />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})