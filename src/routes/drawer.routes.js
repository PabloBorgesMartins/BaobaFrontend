import * as React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerContent} from '../components/SideMenu';

import Profile from '../pages/Profile';
import CoopInvite from '../pages/CoopInvite';
import coopRoutes from './coop.routes';

const Drawer = createDrawerNavigator();

export default function drawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Coop" component={coopRoutes} />
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="Convite" component={CoopInvite} />
    </Drawer.Navigator>
  );
}
