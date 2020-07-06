import React from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';

import background from '../../../assets/images/backgroundBoy.png';

const CoopInvite = () => {
  const navigation = useNavigation();

  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.body}>
          <Text style={[styles.bodyText, {marginTop: hp('3.6%')}]}>
            A professora {<Text style={styles.fonte}>Maria Julieta</Text>}{' '}
            convidou você para participar da atividade{' '}
            {<Text style={styles.fonte}>Livro da infância</Text>}
          </Text>
          <Button
            buttonStyle={styles.buttonLogin}
            title={'Aceitar'}
            onPress={acceptInvite}
          />
        </View>
      </ImageBackground>
    </>
  );

  function acceptInvite() {
    navigation.navigate('CoopNotFound');
  }
};

export default CoopInvite;

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
    alignItems: 'center',
    marginVertical: hp('25%'),
    marginHorizontal: wp('10%'),
  },

  bodyText: {
    fontFamily: 'MavenPro-Medium',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 23,
  },

  buttonLogin: {
    marginTop: hp('5%'),
    borderRadius: 2,
    height: 47,
    width: wp('80%'),
    backgroundColor: '#7D4FE4',
  },
});
