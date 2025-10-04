import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarView = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      // Customize the appearance
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
      // Set the current date
      current={new Date().toISOString().split('T')[0]}
      // Update selected date dynamically
      onDayPress={day => {
        console.log('Selected day', day.dateString);
        setSelected(day.dateString);
      }}
      // Highlight selected date
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
