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
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import background from '../../../assets/images/homeBackground.png';

const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ImageBackground source={background} style={styles.background}>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Icon name="search" size={20} color="black" />
              <TextInput
                style={styles.inputStyle}
                placeholder="Procure livros, autores"
              />
            </View>

            <View style={styles.containerMostRead}>
              <Text style={styles.mostRead}>Os Mais Lidos</Text>
              <View style={{marginTop: 12}} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 20}}>
                <TouchableOpacity style={styles.item} activeOpacity={0.5}>
                  <Text style={styles.itemTitle}>Fatherhood</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} activeOpacity={0.5}>
                  <Text style={styles.itemTitle}>Fatherhood</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} activeOpacity={0.5}>
                  <Text style={styles.itemTitle}>Fatherhood</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} activeOpacity={0.5}>
                  <Text style={styles.itemTitle}>Fatherhood</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  fonte: {
    fontFamily: 'MavenPro-Regular',
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
    marginHorizontal: wp('10%'),
  },

  inputContainer: {
    marginTop: hp('5.5%'),
    marginHorizontal: wp('10%'),
    width: wp('80%'),
    height: 35,
    maxHeight: hp('6%'),
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },

  inputText: {
    fontSize: wp('4.44%'),
    fontFamily: 'MavenPro-Medium',
    textAlign: 'right',
  },

  inputStyle: {
    fontFamily: 'MavenPro-Medium',
    fontSize: wp('4.44%'),
    width: wp('50%'),
    color: '#21212180',
    marginTop: 2,
    alignContent: 'center',
  },

  containerMostRead: {
    marginTop: hp('4%'),
  },

  mostRead: {
    marginLeft: wp('5%'),
    fontFamily: 'MavenPro-Regular',
    fontSize: 24,
    width: wp('50%'),
    color: '#fff',
    marginTop: 2,
    alignContent: 'center',
  },

  item: {
    backgroundColor: '#fff',
    height: 120,
    width: 90,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  itemTitle: {
    fontFamily: 'MavenPro-Regular',
    textAlign: 'center',
    fontSize: 13,
    color: '#fff',
  },
});
