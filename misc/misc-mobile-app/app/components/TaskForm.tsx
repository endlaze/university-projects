import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { faCalendarAlt, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { apiURL, formatDateStr, taskBuilder } from '../assets/constants';
import cstyles from '../assets/common-styles';
import { queenBlue, useInput } from '../assets/constants';
import { carolinaBlue } from '../assets/constants';

import LblIcon from './LblIcon';
import BtnIcon from './BtnIcon';

export default function TaskForm(props: any) {

  const title = useInput('');
  const description = useInput('');
  const [date, setDate] = useState(new Date());
  const [dateStr, setDateStr] = useState({ date: '0000-00-00', time: '00:00:00' });
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    if (!props.visible) return;

    const nDate = props.isTaskNew ? new Date() : new Date(props.task.due_date);

    title.setValue(props.task.title);
    description.setValue(props.task.description);
    setDate(nDate);
    setDateStr(formatDateStr(nDate));
  }, [props.visible]);

  const validateTask = () => (title.value !== '') && (description.value !== '');

  const postTask = () => {

    if (!validateTask()) {
      Alert.alert("Error", "La tarea no puede contener campos vacíos");
      return;
    }

    const action = props.isTaskNew ? 'create' : 'update';
    const postUrl = `${apiURL}task/${action}`;
    const newTask = taskBuilder(props.task.id, title.value, description.value, date.toISOString().slice(0, 19).replace('T', ' '));

    axios.post(postUrl, newTask).then((res) => {
      props.reloadTasks();
    }).catch(err => {
      console.log(err);
    })
  }

  const closeModal = (save: boolean) => {
    if (save) {
      postTask();
    }

    props.setModalVisible(false);
  }

  const onDateChange: any = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setShowTime(false);
    setDate(currentDate);
    setDateStr(formatDateStr(currentDate));
  };

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <View style={{}}>
        <Text style={styles.inputLabel}>Títutlo</Text>
        <TextInput style={styles.input} {...title} />

        <Text style={styles.inputLabel}>Descripción</Text>
        <TextInput style={styles.input} {...description} ></TextInput>

        <Text style={styles.inputLabel}>{'Fecha y hora'}</Text>
        <View style={{ ...cstyles.inline, ...cstyles.mt10, ...{ marginLeft: 15 } }}>
          <TouchableOpacity style={{ ...cstyles.inline, ...cstyles.mt10 }} onPress={() => setShowDate(true)}>
            <LblIcon icon={faCalendarAlt} iconColor={carolinaBlue} text={dateStr.date} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}> | </Text>
          <TouchableOpacity style={{ ...cstyles.inline, ...cstyles.mt10 }} onPress={() => setShowTime(true)} >
            <LblIcon icon={faCalendarAlt} iconColor={carolinaBlue} text={dateStr.time} />
          </TouchableOpacity>
          {showDate && <DateTimePicker value={date} onChange={onDateChange} minimumDate={new Date()} />}
          {showTime && <DateTimePicker value={date} onChange={onDateChange} mode='time' />}
        </View>

        <View style={{ ...cstyles.inline, ...styles.btnWrapper }}>
          <BtnIcon textColor='white' bgColor='red' icon={faWindowClose} text='CERRAR' onPress={() => closeModal(false)} />
          <BtnIcon textColor='white' bgColor={queenBlue} icon={faSave} text='GUARDAR' onPress={() => closeModal(true)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputLabel: { ...cstyles.commonText, ...cstyles.fontBold, ...cstyles.mt10 },
  input: {
    height: 40,
    flexDirection: 'row',
    width: '90%',
    borderRadius: 5,
    borderWidth: 2,
    ...cstyles.mountainMeadowBC,
    margin: 'auto',
    alignSelf: 'center',
    marginTop: 10,
    padding: 10
  },
  btnWrapper: {
    justifyContent: 'center',
    marginTop: 20
  }
});