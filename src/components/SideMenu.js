import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import profileImage from '../../assets/images/profileImage.png';

import AuthContext from '../contexto';

import api from '../services/api';

export function DrawerContent(props) {
  const {signOut} = React.useContext(AuthContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadContent() {
      const token = await AsyncStorage.getItem('userToken');

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

  return (
    <View style={{flex: 1, backgroundColor: '#232D3B'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{alignItems: 'center'}}>
              <Avatar.Image source={profileImage} size={80} />
              <View>
                <Title style={styles.name}>{user.user_name}</Title>
                <Caption style={styles.email}>{user.user_email}</Caption>
              </View>
            </View>
          </View>
          <View style={styles.line} />
          <Drawer.Section {...props} style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" color={'#fff'} size={size} />
              )}
              label={({focused, color}) => (
                <Text style={styles.textButton}>Coop</Text>
              )}
              style={styles.textButton}
              onPress={() => {
                props.navigation.navigate('Coop');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="human-male" color={'#fff'} size={size} />
              )}
              label={({focused, color}) => (
                <Text style={styles.textButton}>Perfil</Text>
              )}
              style={styles.textButton}
              onPress={() => {
                props.navigation.navigate('Perfil');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="email" color={'#fff'} size={size} />
              )}
              label={({focused, color}) => (
                <Text style={styles.textButton}>Convite</Text>
              )}
              style={styles.textButton}
              onPress={() => {
                props.navigation.navigate('Convite');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={'#fff'} size={size} />
          )}
          label={({focused, color}) => (
            <Text style={styles.textButton}>Sair</Text>
          )}
          onPress={() => signOut()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  line: {
    marginHorizontal: 30,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 5,
  },
  name: {
    color: '#98DDD6',
    textAlign: 'center',
    fontFamily: 'MavenPro-Bold',
  },
  email: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'MavenPro-Regular',
  },
  textButton: {
    color: '#7B8188',
    fontFamily: 'MavenPro-Regular',
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
