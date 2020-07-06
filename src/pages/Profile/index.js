import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
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
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import profileImage from '../../../assets/images/profileImage.png';
import background from '../../../assets/images/codeBackground.png';

const Profile = () => {
  const navigation = useNavigation();

  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [stateUser, setStateUser] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function loadContent() {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);

      api
        .get('logged', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
    loadContent();
  }, []);

  useEffect(() => {
    setName(user.user_name);
    setEmail(user.user_email);
    setCountry(user.user_country);
    setStateUser(user.user_state);
    setCity(user.user_city);
    console.log('ta entrando');
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          enabled={true}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={styles.containerIcone}>
              <Image
                source={profileImage}
                style={styles.profileIcone}
                resizeMode={'cover'}
              />
              <Text style={[styles.fonte, styles.name]}>{user.user_name}</Text>
              <Text style={[styles.fonte, styles.email]}>
                {user.user_email}
              </Text>
            </View>

            <View style={styles.body}>
              <Input
                label="Nome Completo"
                labelStyle={[
                  styles.fonte,
                  styles.labelFonts,
                  {marginTop: hp('2%')},
                ]}
                containerStyle={styles.input}
                inputStyle={[styles.fonte, styles.inputText]}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor="#FFF"
              />
              <Input
                label="Email"
                labelStyle={[styles.fonte, styles.labelFonts]}
                containerStyle={styles.input}
                inputStyle={[styles.fonte, styles.inputText]}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#FFF"
              />
              <View style={styles.urfComponent}>
                <Input
                  label="País"
                  labelStyle={[styles.fonte, styles.labelFonts]}
                  containerStyle={styles.countryInput}
                  inputStyle={[styles.fonte, styles.inputText]}
                  placeholder="País"
                  value={country}
                  onChangeText={(text) => setCountry(text)}
                  placeholderTextColor="#FFF"
                />
                <Input
                  label="Estado"
                  labelStyle={[styles.fonte, styles.labelFonts]}
                  containerStyle={styles.stateInput}
                  inputStyle={[styles.fonte, styles.inputText]}
                  placeholder=""
                  value={stateUser}
                  onChangeText={(text) => setStateUser(text)}
                  placeholderTextColor="#FFF"
                />
              </View>
              <Input
                label="Cidade"
                labelStyle={[styles.fonte, styles.labelFonts]}
                containerStyle={styles.input}
                inputStyle={[styles.fonte, styles.inputText]}
                placeholder="Cidade"
                value={city}
                onChangeText={(text) => setCity(text)}
                placeholderTextColor="#FFF"
              />
              <Input
                label="Senha"
                labelStyle={[styles.fonte, styles.labelFonts]}
                containerStyle={styles.input}
                inputStyle={[styles.fonte, styles.inputText]}
                placeholder="Insira sua nova senha"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholderTextColor="#FFF"
              />

              <Button
                buttonStyle={styles.buttonEditar}
                title={'Editar'}
                onPress={editUser}
              />
              <View style={{marginBottom: hp('15%')}} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );

  async function editUser() {
    const userData = {
      user_name: name,
      user_email: email,
      user_password: password,
      user_teacher: user.user_teacher,
      user_country: country,
      user_state: stateUser,
      user_city: city,
    };
    try {
      await api.put('logged', userData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Falha na edição', 'Email já cadastrado.');
    }
  }
};

export default Profile;

const styles = StyleSheet.create({
  fonte: {
    fontFamily: 'MavenPro-Regular',
  },

  name: {
    marginTop: 6,
    fontSize: wp('5%'),
    color: '#98DDD6',
  },

  email: {
    marginTop: 5,
    fontSize: 10,
    color: '#fff',
  },

  background: {
    opacity: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  labelFonts: {
    fontSize: 10,
    color: '#98DDD6',
  },

  profileIcone: {
    height: hp('21%'),
    width: hp('21%'),
  },

  containerIcone: {
    marginTop: hp('3.3%'),
    alignItems: 'center',
  },

  inputText: {
    fontSize: wp('4.44%'),
    fontFamily: 'MavenPro-Medium',
    color: '#98DDD6',
  },

  body: {
    marginHorizontal: wp('10%'),
  },

  input: {
    width: wp('80%'),
  },

  urfComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  countryInput: {
    width: wp('60%'),
  },

  stateInput: {
    width: wp('20%'),
  },

  buttonEditar: {
    marginVertical: hp('3%'),
    borderRadius: 2,
    height: 47,
    backgroundColor: '#7D4FE4',
  },
});
