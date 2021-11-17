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
import { navigate } from '../Navigators/utils'

const HomeContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  const [userId, setUserId] = useState('9')
  const [
    fetchOne,
    { data, isSuccess, isLoading, isFetching, error },
  ] = useLazyFetchOneQuery()

  const onChangeTheme = ({ theme, darkMode }) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  return (
    <ScrollView
      style={Layout.fill, Layout.screenContainer}
      contentContainerStyle={[
        Layout.center,
      ]}
    >
      <Text style={[Fonts.textRegular, Gutters.regularBMargin]}>{t('selectLetter')}</Text>
      <ScrollView>
          {alphabet.map((letter, i) =>
            <TouchableOpacity
              onPress={() => navigate('Instructions')}
              obj={letter} key={i} style={[Common.button.rounded, Gutters.regularBMargin]}>
                <Text style={Fonts.textRegular}>{letter}</Text>
            </TouchableOpacity>
          )}
      </ScrollView>
      
    </ScrollView>
  )
}

export default HomeContainer
