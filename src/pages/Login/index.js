import * as React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';

import logo from '../../../assets/images/baobaLogo.png';
import background from '../../../assets/images/loginBackground.png';

import AuthContext from '../../contexto';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <>
      <ImageBackground source={background} style={styles.background}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.containerLogo}>
            <Image source={logo} style={styles.logo} resizeMode={'cover'} />
          </View>

          <View style={styles.body}>
            <Input
              containerStyle={styles.input}
              inputStyle={[styles.fonte, {fontSize: wp('4.44%')}]}
              placeholder="Email"
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholderTextColor="#FFF"
            />
            <Input
              containerStyle={styles.input}
              inputStyle={[styles.fonte, {fontSize: wp('4.44%')}]}
              placeholder="Senha"
              placeholderTextColor="#FFF"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />

            <TouchableOpacity>
              <Text style={[styles.fonte, styles.rememberText]}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
            <Button
              buttonStyle={styles.buttonLogin}
              title={'Entrar'}
              onPress={() => signIn({username, password})}
            />

            <View style={styles.signUp}>
              <Text style={styles.fonte}>Usuário novo? </Text>
              <TouchableOpacity>
                <Text style={[styles.fonte, {color: '#45D0C1'}]}>
                  Cadastre-se
                </Text>
              </TouchableOpacity>
              <Text style={styles.fonte}> aqui</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Criando sua conta, você concorda com nossos termos de Serviço e
              Política de Privacidade
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  fonte: {
    fontFamily: 'MavenPro-Regular',
    color: '#FFFFFF',
  },

  background: {
    resizeMode: 'cover',
    opacity: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  logo: {
    height: hp('27%'),
    width: wp('80%'),
  },

  containerLogo: {
    marginTop: hp('4%'),
    marginHorizontal: wp('10%'),
  },

  input: {
    width: wp('90%'),
    borderColor: '#45D0C1',
  },

  body: {
    marginHorizontal: wp('5%'),
  },

  rememberText: {
    textAlign: 'right',
    fontSize: wp('3.33%'),
  },

  buttonLogin: {
    marginTop: hp('5%'),
    borderRadius: 2,
    height: 47,
    backgroundColor: '#7D4FE4',
  },

  signUp: {
    justifyContent: 'center',
    marginTop: hp('9%'),
    flexDirection: 'row',
  },

  footer: {
    marginTop: hp('7%'),
    alignItems: 'center',
    marginHorizontal: wp('16%'),
  },

  footerText: {
    fontFamily: 'MavenPro-Regular',
    fontSize: 10,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
