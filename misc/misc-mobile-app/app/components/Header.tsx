import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import cstyles from '../assets/common-styles';

export default function Header(props: any) {
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    ...cstyles.mountainMeadowBg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 45,
    paddingBottom: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  }
});
