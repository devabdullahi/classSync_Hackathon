import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Calendar } from 'react-native-calendars'
import { useFocusEffect, useRoute } from '@react-navigation/native'


const CalendarView = () => {
  const [selected, setSelected] = useState('')
  const navigation = useNavigation()
  const lastClick = useRef(0)
  const route = useRoute()
  const [events, setEvents] = useState({})

  useFocusEffect(() => {
	if (route.params?.newEvent) {
		const { date, title } = route.params.newEvent
		setEvents(prev => ({
			...prev,
			[date]: {
				marked: true,
				dotColor: 'red',
				events: [...(prev[date]?.events || []), title],
			},
		}))
	}
})

const handleDayPress = (day) => {
  const now = Date.now()
  
  // Detect double-click within 400ms
  if (now - lastClick.current < 400) {
    navigation.navigate('AddEvent', { date: day.dateString })
  }
  
  lastClick.current = now
  setSelected(day.dateString)
}



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
     onDayPress={handleDayPress}
     markedDates={{
      ...events,
        [selected]: { ...(events[selected] || {}), selected: true, selectedColor: 'blue' },
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
