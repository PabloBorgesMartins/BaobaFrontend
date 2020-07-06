import * as React from 'react';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Alert, TouchableOpacity, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from './services/api';

import Login from './pages/Login';
import CodeRoom from './pages/CodeRoom';
import Home from './pages/Home';
import CoopActivities from './pages/CoopActivities';
import CoopBookActivity from './pages/CoopBookActivity';
import ChapterCreation from './pages/ChapterCreation';
import CoopNotFound from './pages/CoopNotFound';
import drawerRoutes from './routes/drawer.routes';

const AppStack = createStackNavigator();

import AuthContext from './contexto';

const Routes = ({navigation}) => {
  const [isVinculated, setIsVinculated] = React.useState(true);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        const login = {
          user_email: data.username,
          user_password: data.password,
        };

        try {
          const response = await api.post('sessions', login);
          dispatch({type: 'SIGN_IN', token: response.data.token});
          await AsyncStorage.setItem('userToken', response.data.token);
        } catch (error) {
          Alert.alert(
            'Falha no login',
            'Usuário não encontrado, tente novamente.',
          );
        }
      },
      signOut: async () => {
        dispatch({type: 'SIGN_OUT'});
        await AsyncStorage.removeItem('userToken');
      },
    }),
    [],
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <AppStack.Navigator headerMode="float" options>
          {state.userToken != null ? (
            isVinculated ? (
              <>
                <AppStack.Screen
                  name="Coop"
                  component={drawerRoutes}
                  options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      color: '#fff',
                    },
                    headerStyle: {
                      height: 60,
                      backgroundColor: '#1C2634',
                    },
                    headerLeft: ({color}) => (
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            '',
                            'Arraste o canto esquedo para o lado para abrir o menu',
                          );
                        }}>
                        <View style={{paddingLeft: 15}}>
                          <Icon name="chevron-right" color={'#FFF'} size={22} />
                        </View>
                      </TouchableOpacity>
                    ),
                    headerRight: ({color}) => (
                      <View style={{paddingRight: 15}}>
                        <Icon name="bell" color={'#FFF'} size={22} />
                      </View>
                    ),
                  }}
                />
                <AppStack.Screen name="Atividades" component={CoopActivities} />
                <AppStack.Screen
                  name="ChapterCreation"
                  component={ChapterCreation}
                  options={{
                    headerTitle: 'Capítulo',
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      color: '#fff',
                    },
                    headerStyle: {
                      height: 60,
                      backgroundColor: '#1C2634',
                    },
                  }}
                />
                <AppStack.Screen
                  name="CoopNotFound"
                  component={CoopNotFound}
                  options={{
                    headerTintColor: 'transparent',
                    headerStyle: {
                      height: 0,
                    },
                  }}
                />
                <AppStack.Screen
                  name="CoopBookActivity"
                  component={CoopBookActivity}
                  options={{
                    headerTitle: 'Atividade',
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      color: '#fff',
                    },
                    headerStyle: {
                      height: 60,
                      backgroundColor: '#1C2634',
                    },
                  }}
                />
                <AppStack.Screen name="Home" component={Home} />
              </>
            ) : (
              <AppStack.Screen
                name=" "
                component={CodeRoom}
                headerMode="none"
                options={{
                  headerStyle: {
                    height: 0,
                  },
                }}
              />
            )
          ) : (
            <AppStack.Screen
              name=" "
              component={Login}
              headerMode="none"
              options={{
                headerStyle: {
                  height: 0,
                },
              }}
            />
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );

  function openDrawer() {
    navigation.dispatch(DrawerActions.openDrawer());
  }
};

export default Routes;
