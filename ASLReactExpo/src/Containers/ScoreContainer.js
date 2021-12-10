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
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { navigate } from '../Navigators/utils'

const ScoreContainer = ({ route }) => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y']
  const { letter, predictedLetter } = route.params
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const [
    fetchOne,
    { data, isSuccess, isLoading, isFetching, error },
  ] = useLazyFetchOneQuery()

  return (
    <View
      style={Layout.screenContainer}
    >
      <Text style={[Fonts.textRegular, Layout.center, Gutters.regularBMargin]}>
        {t('scoreBody', { score: alphabet[predictedLetter] })}
      </Text>
      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => navigate('Instructions', {letter: letter})}
      >
        <Text style={Fonts.textRegular}>{t('scoreButtonTry')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => navigate('Home')}
      >
        <Text style={Fonts.textRegular}>{t('scoreButtonHome')}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ScoreContainer
