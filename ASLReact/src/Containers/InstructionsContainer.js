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

const InstructionsContainer = () => {
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
      <Text style={[Fonts.titleRegular, Layout.center, Gutters.regularBMargin]}>{'A'}</Text>
      <View style={[Fonts.textRegular, Layout.center, Gutters.regularBMargin]}><FingerSign /></View>
      <Text style={[Fonts.textRegular, Layout.center, Gutters.regularBMargin]}>{t('instructionA')}</Text>
      <Text style={[Fonts.textRegular, Gutters.regularBMargin]}>{t('instructionBody')}</Text>
      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
      >
        <Text style={Fonts.textRegular}>{t('instructionStartButton')}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InstructionsContainer
