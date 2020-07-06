import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Text,
  TextInput,
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
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import background from '../../../assets/images/backgroundBoy.png';

const ChapterCreation = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const routeParams = route.params;

  const [userToken, setUserToken] = useState('');
  const [textUser, setTextUser] = useState('');

  useEffect(() => {
    async function loadContent() {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    }
    loadContent();
  }, []);

  async function handleSubmit() {
    const cordel = {
      student_homework_id: routeParams.id,
      student_text: textUser,
    };
    const status = {
      homework_status: 'Done',
      student_homework_id: routeParams.id,
    };
    try {
      await api.put('student/text', cordel, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      await api.put('student/status', status, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      navigation.navigate('Coop', {
        screen: 'Atividades',
        refresh: true,
      });
    } catch (error) {
      Alert.alert('Erro ao enviar exercício', 'Tente novamente.');
    }
  }

  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.screen}>
          <Text style={styles.chapter}>Capítulo 1</Text>
          <View style={styles.containerTitle}>
            <Text style={styles.chapterTitle}>O Castelo</Text>
          </View>
          <View style={styles.line} />
          <ScrollView>
            <View style={styles.containerStart}>
              <Text style={styles.chapterTitle}>Inicio</Text>
              <Text style={styles.fonte}>
                Em um belo dia, o príncipe Mateus saiu para brincar com os
                amigos...
              </Text>
            </View>
            <View style={styles.containerMid}>
              <Text style={styles.chapterTitle}>Sua parte</Text>
              <TextInput
                style={styles.fonte}
                multiline={true}
                value={textUser}
                onChangeText={(text) => setTextUser(text)}
              />
            </View>
            <View style={styles.containerStart}>
              <Text style={styles.chapterTitle}>Fim</Text>
              <Text style={styles.fonte}>
                ... até que ele avistou uma árvore.
              </Text>
            </View>
          </ScrollView>
          <Button
            buttonStyle={styles.button}
            title={'Finalizar capítulo'}
            onPress={() => handleSubmit()}
          />
        </View>
        <View style={{marginBottom: hp('14%')}} />
      </ImageBackground>
    </>
  );
};

export default ChapterCreation;

const styles = StyleSheet.create({
  fonte: {
    fontFamily: 'MavenPro-Regular',
    color: '#fff',
    fontSize: 14,
  },

  background: {
    opacity: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  screen: {
    padding: wp('5%'),
  },

  chapter: {
    fontFamily: 'MavenPro-Bold',
    color: '#00D6D8',
    fontSize: 20,
  },

  containerTitle: {
    marginTop: 20,
  },

  chapterTitle: {
    fontFamily: 'MavenPro-Medium',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },

  line: {
    marginHorizontal: wp('5%'),
    borderBottomColor: '#00D6D8',
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 5,
  },

  containerStart: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#45D0C1',
    marginTop: 15,
    padding: 10,
  },

  containerMid: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#45D0C1',
    marginTop: 15,
    padding: 10,
    paddingBottom: 20,
    maxHeight: wp('42%'),
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

  chapterText: {
    fontFamily: 'MavenPro-Medium',
    color: '#fff',
    fontSize: 14,
  },

  button: {
    marginVertical: 20,
    marginBottom: 5,
    borderRadius: 20,
    height: 42,
    backgroundColor: '#00D6D8',
  },
});
