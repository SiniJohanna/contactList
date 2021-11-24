import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';



export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({});

  

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      setContacts(data);
      if (data.length > 0) {
        setCurrentContact(data[0]);
        console.log(data[0]);
      }
    }
  }
  const buttonPressed = () => {
    getContacts();
  }

  

  return (

    <View style={styles.container} >
      <StatusBar style="auto" />
          <View >
            <FlatList 
              ListHeaderComponent= {<Text >Your contacts:</Text>}
              data={contacts}
              renderItem={({ item }) =>
                <Text>{item.name} {item.phoneNumbers[0].number}</Text>
              }
            />
            <Button onPress={buttonPressed} title="Get contacts"  />
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100
    
    
  },
});