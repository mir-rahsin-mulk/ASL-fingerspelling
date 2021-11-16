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
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'

const HomeContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const [
    fetchOne,
    { data, isSuccess, isLoading, isFetching, error },
  ] = useLazyFetchOneQuery()
  
  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.center,
      ]}
    >
      <Text style={Fonts.textRegular}>{t('welcome')}</Text>
      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
      >
        <Text style={Fonts.textRegular}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default HomeContainer
