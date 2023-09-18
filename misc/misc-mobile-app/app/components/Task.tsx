import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faClock, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import cstyles from '../assets/common-styles';
import { apiURL, formatDateStr, carolinaBlue, taskBuilder } from '../assets/constants';

import LblIcon from './LblIcon';

export default function Task(props: any) {
  const { date, time } = formatDateStr(new Date(props.due_date));

  const editTask = () => {
    const task = taskBuilder(props.id, props.title, props.description, props.due_date);

    props.setModalTask(task);
    props.setTaskNew(false);
    props.setModalVisible(true);
  }

  const deleteTask = (taskId: number) => {
    axios.post(apiURL + 'task/delete', { id: taskId }).then((res) => {
      Alert.alert("Recordatorio borrado", "El recordatorio ha sido borrado satisfactoriamente");
      props.reloadTasks();
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <View style={styles.taskStyle}>
      <Text style={{ ...cstyles.commonText, ...cstyles.fontBold, ...cstyles.mt10 }}>{props.title}</Text>
      <Text style={{ ...cstyles.commonText, ...cstyles.mb10 }}>{props.description}</Text>

      <View style={{ ...cstyles.inline, ...cstyles.mt10 }}>
        <LblIcon icon={faCalendarAlt} iconColor={carolinaBlue} text={date} />
        <LblIcon icon={faClock} iconColor={carolinaBlue} text={time} />

        <Text onPress={() => editTask()} style={{ ...cstyles.ml20 }} >
          <FontAwesomeIcon icon={faEdit} size={30} style={{ ...cstyles.queenBlueText }} />
        </Text>
        <Text onPress={() => deleteTask(props.id)} style={{ ...cstyles.ml20 }}>
          <FontAwesomeIcon icon={faTrash} size={30} style={{ color: 'red' }} />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskStyle: {
    paddingBottom: 15,
    borderBottomWidth: 2,
    ...cstyles.mountainMeadowBC
  }
});
