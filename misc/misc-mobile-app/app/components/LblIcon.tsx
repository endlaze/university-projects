
import React from 'react';
import { Text } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import cstyles from '../assets/common-styles';

export default function LblIcon(props: any) {
  return (
    <>
      <Text style={{ ...cstyles.ml10 }} >
        <FontAwesomeIcon icon={props.icon} style={{ color: props.iconColor }} size={30} />
      </Text>
      <Text style={{ ...cstyles.commonText }}>{props.text}</Text>
    </>
  );
};
