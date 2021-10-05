import React, { useState } from "react";
import {View, StyleSheet, Image, Button, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'; 

async function askForPermissions() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Ошибка', 'Вы не дали прав на содание фото');
    return false
  }
  return true;
}

export const PhotoPicker = ({onPick}) => {
  const [image, setImage] = useState()

  const takePhoto = async () => {
    const hasPermission = await askForPermissions();

    if (!hasPermission) {
      return
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9]
    });

    setImage(img.uri);
    onPick(img.uri);
  }
  return (
    <View style={styles.wrapper}>
      <Button title='Сделать фото' onPress={takePhoto} />
      {image && <Image style={styles.image} source={{uri: image}} />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200
  }
});