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

import profileImage from '../../../assets/images/profileImage.png';
import background from '../../../assets/images/codeBackground.png';

const CodeRoom = () => {
  const [code, setCode] = React.useState('');

  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.containerIcone}>
            <Image
              source={profileImage}
              style={styles.profileIcone}
              resizeMode={'cover'}
            />
            <Text style={[styles.fonte, styles.name]}>
              João da Silva Flicts
            </Text>
          </View>

          <View style={styles.body}>
            <Text style={[styles.bodyText, {marginTop: hp('3.6%')}]}>
              Sua conta está criada!
            </Text>
            <Text style={styles.bodyText}>
              Clique em começar para continuar
            </Text>

            <Text style={[styles.bodyText, {marginTop: hp('3.6%')}]}>
              Insira o código da sua turma para começar
            </Text>

            <Input
              containerStyle={styles.input}
              inputStyle={[styles.fonte, styles.inputText]}
              placeholder="Código"
              placeholderTextColor="#45D0C1"
              value={code}
              onChangeText={setCode}
            />
            <Button
              buttonStyle={styles.buttonLogin}
              title={'Começar'}
              onPress={validateCode}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );

  function validateCode() {
    //navigation.navigate('Coop');
  }
};

export default CodeRoom;

const styles = StyleSheet.create({
  fonte: {
    fontFamily: 'MavenPro-Regular',
  },

  name: {
    marginTop: 6,
    fontSize: wp('5%'),
    color: '#98DDD6',
  },

  background: {
    opacity: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  profileIcone: {
    height: hp('21%'),
    width: hp('21%'),
  },

  containerIcone: {
    marginTop: hp('17.6%'),
    alignItems: 'center',
  },

  input: {
    marginTop: hp('3.6%'),
    width: wp('55.55%'),
  },

  inputText: {
    fontSize: wp('4.44%'),
    textAlign: 'center',
  },

  body: {
    alignItems: 'center',
    marginHorizontal: wp('5%'),
  },

  bodyText: {
    fontFamily: 'MavenPro-Medium',
    color: '#FFF',
    fontSize: wp('4%'),
  },

  buttonLogin: {
    marginTop: hp('2%'),
    borderRadius: 2,
    height: 47,
    width: wp('40%'),
    backgroundColor: '#7D4FE4',
  },
});
