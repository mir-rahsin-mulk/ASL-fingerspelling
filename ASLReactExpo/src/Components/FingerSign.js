import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { useTheme } from '@/Hooks'

const FingerSign = ({ height, width, mode, letter }) => {
  const { Layout, Images } = useTheme()

  const getImage = () => {
    if (letter == 'A') {
      return Images.signA
    }
    else if (letter == 'B') {
      return Images.signB
    }
    else if (letter == 'C') {
      return Images.signC
    }
    else if (letter == 'D') {
      return Images.signD
    }
    else if (letter == 'E') {
      return Images.signE
    }
    else if (letter == 'F') {
      return Images.signF
    }
    else if (letter == 'G') {
      return Images.signG
    }
    else if (letter == 'H') {
      return Images.signH
    }
    else if (letter == 'I') {
      return Images.signI
    }
    else if (letter == 'J') {
      return Images.signJ
    }
    else if (letter == 'K') {
      return Images.signK
    }
    else if (letter == 'L') {
      return Images.signL
    }
    else if (letter == 'M') {
      return Images.signM
    }
    else if (letter == 'N') {
      return Images.signN
    }
    else if (letter == 'O') {
      return Images.signO
    }
    else if (letter == 'P') {
      return Images.signP
    }
    else if (letter == 'Q') {
      return Images.signQ
    }
    else if (letter == 'R') {
      return Images.signR
    }
    else if (letter == 'S') {
      return Images.signS
    }
    else if (letter == 'T') {
      return Images.signT
    }
    else if (letter == 'U') {
      return Images.signU
    }
    else if (letter == 'V') {
      return Images.signV
    }
    else if (letter == 'W') {
      return Images.signW
    }
    else if (letter == 'X') {
      return Images.signX
    }
    else if (letter == 'Y') {
      return Images.signY
    }
    else if (letter == 'Z') {
      return Images.signZ
    }
  }

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={getImage()} resizeMode={mode} />
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
