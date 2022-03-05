import React from 'react'
import { Text, View } from 'react-native'

const App = () => {
  return (
    <View style={{
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{
        color: '#4965B0',
        fontSize: 48
      }}>Hello World !!!</Text>
    </View>
  )
}

export default App
