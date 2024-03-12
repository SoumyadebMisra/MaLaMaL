import { View, Pressable } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { YStack, Input as TextInput, Button, Text, SizableText } from 'tamagui'
import { Link } from 'expo-router';


const register = () => {

  const { isLoaded, signUp, setActive } = useSignUp()

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [pendingVerfication, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        username,
        password,
        firstName,
        lastName
      });

      await setActive({ session: signUp.createdSessionId });

      // Send verification Email
      // await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // // // change the UI to verify the email address
      // setPendingVerification(true);
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  }
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <YStack
      flex={1}
      padding="$3"
      gap="$2"
      justifyContent='center'
      backgroundColor={'$background'} >
      {/* <Stack.Screen options={{ headerBackVisible: !pendingVerfication }} /> */}
      <Spinner visible={loading} />

      {
        !pendingVerfication && (
          <YStack
            flex={1}
            // padding="$3"
            gap="$2"
            justifyContent='center'
            backgroundColor={'$background'}>

            <SizableText size='$6'>Create your account</SizableText>
            <TextInput
              autoCapitalize='none'
              // className="w-11/12 mx-auto p-3 h-12 bg-white rounded-lg border-2 border-gray-300"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              autoCapitalize='none'
              // className="w-11/12 mx-auto p-3 h-12 bg-white rounded-lg border-2 border-gray-300"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              autoCapitalize='none'
              // className="w-11/12 mx-auto p-3 h-12 bg-white rounded-lg border-2 border-gray-300"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />

            <TextInput
              secureTextEntry={true}
              // className="w-11/12 mx-auto p-3 h-12 bg-white rounded-lg border-2 border-gray-300"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}

            />
            <Button onPress={onSignUpPress}  >Sign Up</Button>

            <Link href="/login" asChild>
              <Pressable>
                <Text >Already have an account?</Text>
              </Pressable>
            </Link>
          </YStack>
        )}

      {/* {pendingVerfication && (
        <YStack
          flex={1}
          padding="$3"
          gap="$2"
          justifyContent='center'
          backgroundColor={'$background'}>
          <TextInput
            // className="w-11/12 mx-auto p-3 h-12 bg-white rounded-lg border-2 border-gray-300"
            placeholder="Verification Code..."
            value={code}
            onChangeText={setCode}
          />
          <Button onPress={onPressVerify} title="Verify" color={'#6c47ff'} />
        </YStack>

      )} */}
    </YStack>
  )
}

export default register