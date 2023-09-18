import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import cstyles from '../assets/common-styles';

export default function Header(props: any) {
  return (
    <TouchableOpacity style={{ ...styles.btnIcon, backgroundColor: props.bgColor }} onPress={props.onPress} >
      <Text style={{ ...cstyles.commonText, color: props.textColor, ...cstyles.fontBold }}> {props.text}</Text>
      <Text style={{ ...cstyles.ml10 }} >
        <FontAwesomeIcon style={{ color: props.textColor }} icon={props.icon} size={30} />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnIcon: {
    ...cstyles.inline,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10
  }
});
