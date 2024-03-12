import { View, Pressable } from 'react-native'
import { useRef, useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import Spinner from 'react-native-loading-spinner-overlay'
import { Link } from 'expo-router'
import { Input, Button, YStack, Text, XStack, SizableText } from 'tamagui'




const Login = () => {
    const { signIn, setActive, isLoaded } = useSignIn()


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSignInPress = async () => {
        if (!isLoaded) {
            return;
        }
        setLoading(true);
        try {
            const completeSignIn = await signIn.create({
                identifier: username,
                password,
            });

            // This indicates the user is signed in
            await setActive({ session: completeSignIn.createdSessionId });
        } catch (err) {
            alert(err.errors[0].message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <YStack
            flex={1}
            padding="$3"
            gap="$2"
            justifyContent='center'
            backgroundColor={'$background'}
        >
            <Spinner visible={loading} />
            <SizableText size='$6'>Login into your account</SizableText>
            <Input
                autoCapitalize='none'
                // className="w-11/12 mx-auto p-3 h-12 bg-white rounded-lg border-2 border-gray-300"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <Input
                // className="w-11/12 mx-auto p-3 h-12 bg-white rounded-lg border-2 border-gray-300"
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Button onPress={onSignInPress} >Login</Button>

            
            <Link href="/register" asChild>
                <Pressable>
                    <Text >Don't have an account? Create Account</Text>
                </Pressable>
            </Link>
        </YStack>
    )
}

export default Login