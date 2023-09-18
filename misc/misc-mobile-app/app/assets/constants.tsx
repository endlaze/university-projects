import { useState } from 'react'
export const apiURL = 'https://programa-movil-proyecto.herokuapp.com/';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(value: any) {
    setValue(value);
  }

  return {
    value: value,
    onChangeText: handleChange,
    setValue
  }
}

const checkTime = (time: number) => {
  let timeStr = `${time}`;
  if (time < 10) timeStr = `0${timeStr}`;
  return `${timeStr}`
}

export const formatDateStr = (date: Date) => {
  let nDate = {
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    time: `${checkTime(date.getHours())}:${checkTime(date.getMinutes())}`
  }

  return nDate
}

export const taskBuilder = (id: number, title: string, description: string, due_date: string) => {
  const task = {
    id: id,
    title: title,
    description: description,
    due_date: due_date
  }
  return task
}

export const mountainMeadow = '#13C4A3'
export const carolinaBlue = '#39A0ED'
export const queenBlue = '#4C6085'