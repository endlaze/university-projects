import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { apiURL } from './assets/constants';
import { carolinaBlue, taskBuilder } from './assets/constants';

import ITask from './interfaces/ITask';

import Header from './components/Header';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import BtnIcon from './components/BtnIcon';


export default function App() {
  const appTitle: string = 'Recordatorios';
  const baseTask = taskBuilder(0, '', '', '');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTask, setModalTask] = useState({});
  const [isTaskNew, setIsTaskNew] = useState(true);

  const getMany = (setter: any, route: string) => {
    axios.get(route)
      .then((res) => {
        setter(res.data);
      }).catch(err => {
        console.log(err);
      });
  }

  const loadTasks = () => {
    getMany(setTasks, apiURL + 'task/read');
  }

  const openNewTask = () => {
    setModalVisible(true);
    setIsTaskNew(true);
    setModalTask(baseTask);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <SafeAreaView style={styles.fl1}>
      <StatusBar style="light" />
      <Header title={appTitle} />
      <BtnIcon textColor='white' bgColor={carolinaBlue} icon={faPlus} onPress={openNewTask} text='NUEVO RECORDATORIO'></BtnIcon>
      <ScrollView style={styles.fl1}>
        {tasks.map((task: ITask, index) =>
          <Task key={index} {...task} reloadTasks={loadTasks} setModalTask={setModalTask} setModalVisible={setModalVisible} setTaskNew={setIsTaskNew} />
        )}
      </ScrollView>
      <TaskForm task={modalTask} visible={modalVisible} reloadTasks={loadTasks} setModalVisible={setModalVisible} isTaskNew={isTaskNew} />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  fl1: {
    flex: 1
  },
});
