import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const CoopActivities = () => {
  return (
    <View style={styles.header}>
      <Button
        buttonStyle={styles.button}
        icon={<Icon name="bars" size={20} color="white" />}
      />
      <Text />
      <Button
        buttonStyle={styles.button}
        icon={<Icon name="bell" size={20} color="white" />}
      />
    </View>
  );
};

export default CoopActivities;

const styles = StyleSheet.create({
  fonte: {
    fontFamily: 'MavenPro-Regular',
    color: '#45D0C1',
    fontSize: 23,
  },
  header: {
    width: wp('100%'),
    height: hp('8.3%'),
    maxHeight: 55,
    flexDirection: 'row',
    backgroundColor: '#1C2634',
  },
  button: {
    backgroundColor: '#1C2634',
  },
});
