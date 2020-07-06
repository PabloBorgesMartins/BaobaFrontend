import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';

import coopActivites from '../pages/CoopActivities';
import coopHistory from '../pages/CoopHistory';

const Tab = createMaterialTopTabNavigator();

export default function coopRoutes() {
  return (
    <Tab.Navigator
      headerMode="screen"
      initialRouteName="coopActivites"
      tabBarOptions={{
        showIcon: true,
        tabStyle: {
          flexDirection: 'row',
        },
        labelStyle: {
          fontSize: 14,
          fontFamily: 'MavenPro-Regular',
          color: '#FFF',
        },
        style: {backgroundColor: '#1C2634', height: 50},
      }}>
      <Tab.Screen
        name="Histórico"
        component={coopHistory}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="history" color={'#FFF'} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Atividades"
        component={coopActivites}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="book" color={'#FFF'} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
