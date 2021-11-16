import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer } from '@/Containers'
import { WelcomeContainer } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={WelcomeContainer} />
      <Tab.Screen name="Home" component={HomeContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
