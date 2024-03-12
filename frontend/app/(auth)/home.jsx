import { View, Text } from 'react-native'
import React from 'react'
import { YStack } from 'tamagui'

export default function home() {
  return (
    <YStack backgroundColor={'$background'} flex={1}>
      <Text>home</Text>
    </YStack>
  )
}