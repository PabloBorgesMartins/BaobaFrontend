import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';

import api from '../../services/api';

import background from '../../../assets/images/backgroundBoy.png';
import castelo from '../../../assets/images/books/casteloEncantado.png';

const CoopBookActivity = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const routeParams = route.params;

  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <ScrollView>
          <View style={styles.section}>
            <Image source={castelo} style={styles.imageBook} />
            <View style={styles.bookContainer}>
              <Text style={styles.bookTitle}>O Castelo Encantado</Text>
              <Text style={styles.teacher}>
                Professor responsável:
                {<Text style={styles.teacherName}> Maria Julieta</Text>}
              </Text>
              <View style={{marginTop: 8}} />
              <Text style={styles.bookDescription}>
                O tesouro está em um castelo como será sua jornada para
                resgatá-lo? Quem estará do seu lado? Caiu? Levante-se e não
                derrube quem te derrubou, ele vai cair sozinho
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <Text style={styles.indice}>Índice</Text>
          <View style={styles.chapterContainer}>
            <View style={styles.chapterSection}>
              <Text style={styles.chapter}>Capítulo 1</Text>
              <Text style={styles.chapterCreator}>João da Silva Flicts</Text>
              <Text style={styles.chapterTitle}>O Castelo</Text>
              <View style={{marginTop: 5}} />
              <Text style={styles.chapterText}>
                {routeParams.textUser
                  ? routeParams.textUser
                  : 'Escreva sua história'}
              </Text>
              <View style={{alignItems: 'flex-end'}}>
                <Button
                  buttonStyle={styles.button}
                  title={'escrever'}
                  onPress={() =>
                    handleSelectItem(routeParams.id, routeParams.chapter)
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.chapterContainer}>
            <View style={styles.chapterSection}>
              <Text style={styles.chapter}>Capítulo 2</Text>
              <Text style={[styles.chapterCreator, {color: '#fff'}]}>
                Felícia Coelho
              </Text>
              <Text style={styles.chapterTitle}>A tempestade</Text>
              <View style={{marginTop: 5}} />
              <Text style={styles.chapterText}>
                No dia que saiu de casa uma tempestade que nunca tinha visto
                antes assustou Braum.
              </Text>
              <View style={{alignItems: 'flex-end'}}>
                <Button buttonStyle={styles.button} title={'ler'} />
              </View>
            </View>
          </View>
          <View style={styles.chapterContainer}>
            <View style={styles.chapterSection}>
              <Text style={styles.chapter}>Capítulo 3</Text>
              <Text style={[styles.chapterCreator, {color: '#fff'}]}>
                José Bernardo
              </Text>
              <Text style={styles.chapterTitle}>O raio</Text>
              <View style={{marginTop: 5}} />
              <Text style={styles.chapterText}>
                Braum correu para baixo de um baobá, e bem à sua frente caiu um
                raio que estremeceu tudo ao redor.
              </Text>
              <View style={{alignItems: 'flex-end'}}>
                <Button buttonStyle={styles.button} title={'ler'} />
              </View>
            </View>
          </View>
          <View style={{marginBottom: hp('15%')}} />
        </ScrollView>
      </ImageBackground>
    </>
  );

  function handleSelectItem(idHomework, chapterNumber) {
    navigation.navigate('ChapterCreation', {
      id: idHomework,
      chapter: chapterNumber,
    });
  }
};

export default CoopBookActivity;

const styles = StyleSheet.create({
  fonte: {
    fontFamily: 'MavenPro-Regular',
    color: '#45D0C1',
    fontSize: 23,
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
    flex: 1,
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
    color: '#00D6D8',
    fontSize: 16,
    textAlign: 'center',
  },

  teacher: {
    textAlign: 'center',
    color: '#D1DDDF',
    fontSize: 8,
  },

  teacherName: {
    color: '#00D6D8',
    fontSize: 8,
  },

  bookDescription: {
    textAlign: 'center',
    fontFamily: 'MavenPro-Medium',
    color: '#D1DDDF',
    fontSize: 10,
  },

  line: {
    width: wp('60%'),
    marginHorizontal: wp('20%'),
    borderBottomColor: '#00D6D8',
    borderBottomWidth: 2,
    marginBottom: 10,
  },

  indice: {
    fontFamily: 'MavenPro-Bold',
    textAlign: 'center',
    color: '#00D6D8',
    fontSize: 20,
  },

  chapterContainer: {
    width: wp('90%'),
    marginHorizontal: wp('5%'),
  },

  chapterSection: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#45D0C1',
    marginTop: 15,
    padding: 10,
  },

  chapter: {
    fontFamily: 'MavenPro-Bold',
    color: '#45D0C1',
    fontSize: 18,
  },

  chapterTitle: {
    fontFamily: 'MavenPro-Medium',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },

  chapterCreator: {
    fontFamily: 'MavenPro-Bold',
    color: '#45D0C1',
    fontSize: 12,
  },

  chapterHeader: {
    flexDirection: 'row',
  },

  chapterText: {
    fontFamily: 'MavenPro-Medium',
    color: '#fff',
    fontSize: 14,
  },

  button: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    height: 22,
    backgroundColor: '#00D6D8',
  },
});
