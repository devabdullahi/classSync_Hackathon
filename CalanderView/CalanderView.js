import React, { useState, useRef } from 'react';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const CalendarView = () => {
  const [selected, setSelected] = useState('');
  const lastClick = useRef(0);
  const navigation = useNavigation();

  const handleDayPress = (day) => {
    const now = Date.now();
    if (now - lastClick.current < 400) {
      // Double tap detected
      navigation.navigate('AddEvent', { date: day.dateString });
    }
    lastClick.current = now;
    setSelected(day.dateString);
  };

  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
      current={new Date().toISOString().split('T')[0]}
      onDayPress={handleDayPress}
      markedDates={{
        [selected]: { selected: true, selectedColor: 'blue' },
      }}
      theme={{
        selectedDayBackgroundColor: '#00adf5',
        todayTextColor: '#00adf5',
        arrowColor: 'orange',
      }}
    />
  );
};

export default CalendarView;
