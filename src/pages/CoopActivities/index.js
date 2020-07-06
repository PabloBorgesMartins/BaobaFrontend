import React, {useState, useEffect, Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import background from '../../../assets/images/backgroundBoy.png';
import bruxa from '../../../assets/images/books/bruxaDoBem.png';
import castelo from '../../../assets/images/books/casteloEncantado.png';

const CoopActivities = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const route = useRoute();

  const [items, setItems] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadContent() {
      if (isFocused) {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
        console.log(`O token de usuario é esse: ${token}`);
        api
          .get('student', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setItems(response.data);
          });
      }
    }
    loadContent();
  }, [isFocused]);

  useEffect(() => {
    const filteredItems = items.filter(
      (item) => item.homework_status !== 'Done',
    );
    setBooks(filteredItems);
  }, [items]);

  function handleSelectItem(idHomework, chapterNumber) {
    navigation.navigate('CoopBookActivity', {
      id: idHomework,
      chapter: chapterNumber,
    });
  }

  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <ScrollView>
          <View style={styles.scroll}>
            {books.map((item) => (
              <View key={String(item.homework_id)} style={styles.section}>
                <Image source={castelo} style={styles.imageBook} />
                <View style={styles.bookContainer}>
                  <Text style={styles.bookTitle}>O Castelo Encantado</Text>
                  <Text style={styles.teacher}>
                    Professor responsável:
                    {<Text style={styles.teacherName}>Maria Julieta</Text>}
                  </Text>
                  <View style={{marginTop: 8}} />
                  <Text style={styles.bookDescription}>
                    O tesouro está em um castelo, como será sua jornada para
                    resgatá-lo? Quem estará do seu lado? ...
                  </Text>
                  <View style={styles.scroll}>
                    <Button
                      buttonStyle={styles.button}
                      title={'+info'}
                      onPress={() =>
                        handleSelectItem(
                          item.student_homework_id,
                          item.student_chapters,
                        )
                      }
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={{marginBottom: hp('20%')}} />
        </ScrollView>
      </ImageBackground>
    </>
  );

  function openBook() {
    navigation.navigate('CoopBookActivity');
  }
};

export default CoopActivities;

const styles = StyleSheet.create({
  fonte: {
    fontFamily: 'MavenPro-Regular',
    color: '#45D0C1',
    fontSize: 23,
  },

  scroll: {
    alignItems: 'center',
  },

  background: {
    opacity: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  section: {
    marginTop: 42,
    width: wp('90%'),
    borderWidth: 3,
    borderRadius: 25,
    borderColor: '#45D0C1',
    padding: 5,
    flexDirection: 'row',
  },

  imageBook: {
    borderRadius: 4,
    width: wp('27%'),
    height: hp('24%'),
  },

  bookContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: wp('27%'),
  },

  bookTitle: {
    fontFamily: 'MavenPro-Medium',
    color: '#00D6D8',
    fontSize: 16,
  },

  teacher: {
    color: '#D1DDDF',
    fontSize: 8,
  },

  teacherName: {
    color: '#00D6D8',
    fontSize: 8,
  },

  bookDescription: {
    fontFamily: 'MavenPro-Medium',
    color: '#fff',
    fontSize: 12,
  },

  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 19,
    width: 56,
    backgroundColor: '#00D6D8',
  },
});
