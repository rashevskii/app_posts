import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Image, 
  Button, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { addPost } from "../store/actions/post";
import { THEME } from "../theme";

export const CreateScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const img = 'https://traveller-eu.ru/sites/default/files/styles/index/public/42-74723835-800x450.jpg?itok=TS77HGGo';
  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: img,
      booked: false,
    }
    dispatch(addPost(post));
    navigation.navigate('Main');
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={styles.wraper}>
          <Text style={styles.title}>Создай новый пост</Text>
          <TextInput
            style={styles.textarea}
            placeholder='Текст заметки'
            value={text}
            onChangeText={setText}
            multiline
          />
          <Image
            style={{ width: '100%', height: 200, marginBottom: 10 }}
            source={{ uri: img }}
          />
          <Button title='Создать пост' color={THEME.MAIN_COLOR} onPress={saveHandler} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
};

CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Создание поста',
  headerLeft: () =>
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Toggle Drawer'
        iconName='ios-menu'
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
});

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  }
});