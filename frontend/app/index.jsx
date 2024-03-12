import { View } from 'react-native'
import { Button, Spinner, TamaguiProvider, YStack } from 'tamagui'
import React from 'react'


export default function IndexPage() {
    return (
        // <TamaguiProvider config={config}>

        <YStack alignItems='center'>
            <Spinner size="small" color="$orange10" />
        </YStack>
        // </TamaguiProvider>
    )
}