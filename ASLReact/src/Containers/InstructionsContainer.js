import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FingerSign } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { navigate } from '../Navigators/utils'

const InstructionsContainer = ({ route }) => {
  const { letter } = route.params
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const [
    fetchOne,
    { data, isSuccess, isLoading, isFetching, error },
  ] = useLazyFetchOneQuery()
  const instruction = `instruction${letter}`

  return (
    <View
      style={Layout.screenContainer}
    >
      <Text style={[Fonts.titleRegular, Layout.center, Gutters.regularBMargin]}>{letter}</Text>
      <View style={[Fonts.textRegular, Layout.center, Gutters.regularBMargin]}><FingerSign letter={letter}/></View>
      <Text style={[Fonts.textRegular, Layout.center, Gutters.regularBMargin]}>{t(instruction)}</Text>
      <Text style={[Fonts.textRegular, Gutters.regularBMargin]}>{t('instructionBody')}</Text>
      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => navigate('Camera', {letter: letter})}
      >
        <Text style={Fonts.textRegular}>{t('instructionStartButton')}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InstructionsContainer
