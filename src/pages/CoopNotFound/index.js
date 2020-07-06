import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';

import background from '../../../assets/images/backgroundBoy.png';

const CoopNotFound = () => {
  const navigation = useNavigation();

  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.body}>
          <Text style={[styles.bodyText, {marginTop: hp('3.6%')}]}>
            Atividade não encontrada.
          </Text>
          <Text style={[styles.bodyText, {marginTop: hp('3.6%')}]}>
            Consulte seu
            {<Text style={{color: '#45D0C1'}}> Professor(a)</Text>}
          </Text>
          <Button
            buttonStyle={styles.buttonLogin}
            title={'voltar'}
            onPress={goHome}
          />
        </View>
      </ImageBackground>
    </>
  );

  function goHome() {
    navigation.popToTop();
  }
};

export default CoopNotFound;

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

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('20%'),
  },

  bodyText: {
    fontFamily: 'MavenPro-Medium',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 25,
  },

  buttonLogin: {
    marginTop: hp('5%'),
    borderRadius: 2,
    height: 47,
    width: wp('80%'),
    backgroundColor: '#7D4FE4',
  },
});
