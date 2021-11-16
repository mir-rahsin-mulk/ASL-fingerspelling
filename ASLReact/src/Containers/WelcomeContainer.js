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

const WelcomeContainer = () => {
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
      <Text style={[Fonts.titleSmall, Layout.center, Gutters.regularBMargin]}>{t('welcomeTitle')}</Text>
      <Text style={[Fonts.textRegular, Layout.center, Gutters.regularBMargin]}>{t('welcomeBody')}</Text>
      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
      >
        <Text style={Fonts.textRegular}>{t('welcomeButton')}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomeContainer
