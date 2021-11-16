import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { useTheme } from '@/Hooks'

const FingerSign = ({ height, width, mode, letter }) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={Images.signA} resizeMode={mode} />
    </View>
  )
}

FingerSign.propTypes = {
  height: PropTypes.number,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.number,
}

FingerSign.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
}

export default FingerSign
