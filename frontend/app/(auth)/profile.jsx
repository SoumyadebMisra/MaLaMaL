// import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { YStack, Text, Button, Input as TextInput, SizableText } from 'tamagui';

const Profile = () => {
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);

    const onSaveUser = async () => {
        try {
            // This is not working!
            const result = await user?.update({
                firstName: firstName,
                lastName: lastName,
            });
            console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
        } catch (e) {
            console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
        }
    };

    return (
        <YStack flex={1}
            padding="$3"
            gap="$2"
            justifyContent='center'
            backgroundColor={'$background'}>
            <SizableText size={'$6'} textAlign='center'>
                Welcome to your profile page, {user?.firstName} {user?.lastName}!
            </SizableText>

            {/* <TextInput placeholder="First Name" value={firstName || ""} onChangeText={setFirstName} />
            <TextInput placeholder="Last Name" value={lastName || ""} onChangeText={setLastName} />
            <Button onPress={onSaveUser}>Update Account</Button> */}
        </YStack>
    );
};



export default Profile;