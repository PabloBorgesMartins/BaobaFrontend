import React, {useState, useEffect, Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import background from '../../../assets/images/backgroundBoy.png';
import minhasFerias from '../../../assets/images/books/minhasFerias.png';
import primeiroAmor from '../../../assets/images/books/primeiroAmor.png';
import castelo from '../../../assets/images/books/casteloEncantado.png';

const CoopHistory = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

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
      (item) => item.homework_status === 'Done',
    );
    setBooks(filteredItems);
  }, [items]);

  function handleSelectItem(idHomework, chapterNumber, textUser) {
    navigation.navigate('CoopBookActivity', {
      id: idHomework,
      chapter: chapterNumber,
      textUser: textUser,
    });
  }

  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={styles.scroll}>
              {books.map((item) => (
                <View key={String(item.homework_id)} style={styles.section}>
                  <Image source={castelo} style={styles.imageBook} />
                  <View style={styles.bookContainer}>
                    <Text style={styles.bookTitle}>O Castelo Encantado</Text>
                    <View style={{marginTop: 5}} />
                    <Text style={styles.teacher}>Sala 42</Text>
                    <View style={{marginTop: 5}} />
                    <Text style={styles.teacher}>
                      Professor(a) responsável:
                    </Text>
                    <Text style={styles.teacher}>Maria Julieta</Text>
                    <View style={{marginTop: 10}} />
                    <View style={styles.stars}>
                      <Icon name="star" size={20} color="yellow" />
                      <Icon name="star" size={20} color="yellow" />
                      <Icon name="star" size={20} color="yellow" />
                      <Icon name="star" size={20} color="yellow" />
                      <Icon name="star-half" size={20} color="yellow" />
                    </View>
                    <Text style={styles.footer}>6042 Acessos</Text>
                    <Text style={styles.footer}>Jun 16, 2019</Text>
                    <View style={styles.containerButton}>
                      <Button
                        buttonStyle={styles.button}
                        title={'Ler'}
                        onPress={() =>
                          handleSelectItem(
                            item.student_homework_id,
                            item.student_chapters,
                            item.student_text,
                          )
                        }
                      />
                    </View>
                  </View>
                </View>
              ))}

              <View style={{marginBottom: hp('20%')}} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );

  function openBook() {
    navigation.navigate('CoopBookActivity');
  }
};

export default CoopHistory;

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
    maxWidth: wp('100%'),
    padding: 5,
    flexDirection: 'row',
  },

  imageBook: {
    borderRadius: 4,
    width: wp('35%'),
    height: hp('30%'),
  },

  bookContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: wp('36%'),
  },

  bookTitle: {
    fontFamily: 'MavenPro-Medium',
    color: '#fff',
    fontSize: 16,
  },

  teacher: {
    color: '#D1DDDF',
    fontSize: 10,
  },

  stars: {
    flexDirection: 'row',
  },

  footer: {
    color: '#D1DDDF',
    fontSize: 12,
  },

  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    height: 32,
    width: 90,
    backgroundColor: '#00D6D8',
  },
});
