import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as Contacts from 'expo-contacts';


export default function ContactService() {

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers],
            });
    
            if (data.length > 0) {
              const contact = data;
              // console.log(contact);
            }
          }
        })();
      }, []);

  return (
    <View style={styles.container}>
      <Text>Contacts Module Example</Text>
    </View>
  );
}