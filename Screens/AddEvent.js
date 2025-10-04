import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For clock icon, use expo or any icon lib

export default function AddEvent() {
  // State
  const navigation = useNavigation()
  const [currentTime, setCurrentTime] = useState('');
  const [view, setView] = useState('calendar'); // calendar or schedule
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Class');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Update current time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Render

  return (
    <SafeAreaView style={styles.container}>
  <View style={styles.backContainer}>
   <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={24} color="#4B46E4" />
   </TouchableOpacity>
  </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Ionicons name="calendar-outline" size={24} color="white" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.logoTitle}>ClassSync</Text>
            <Text style={styles.logoSubtitle}>Your unified schedule dashboard</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={18} color="#555" />
            <Text style={styles.timeText}>{currentTime}</Text>
          </View>

          <TouchableOpacity style={styles.addEventBtn}>
            <Ionicons name="add" size={18} color="white" />
            <Text style={styles.addEventTxt}>Add Event</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.importBtn}>
            <Ionicons name="cloud-upload-outline" size={18} color="white" />
            <Text style={styles.importTxt}>Import Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Views Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, view === 'schedule' && styles.toggleActive]}
          onPress={() => setView('schedule')}
        >
          <Text style={[styles.toggleText, view === 'schedule' && styles.toggleTextActive]}>
            Schedule View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, view === 'calendar' && styles.toggleActive]}
          onPress={() => setView('calendar')}
        >
          <Text style={[styles.toggleText, view === 'calendar' && styles.toggleTextActive]}>
            Calendar View
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add New Event */}
      <View style={styles.addEventContainer}>
        <View style={styles.addEventHeader}>
          <Text style={styles.addEventTitle}>Add New Event</Text>
          <TouchableOpacity>
            <Ionicons name="close-outline" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.eventInput}
          placeholder="Event Title"
          value={eventTitle}
          onChangeText={setEventTitle}
        />

        <View style={styles.row}>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.picker}
              value={eventType}
              onChangeText={setEventType}
              placeholder="Event Type (e.g. Class)"
            />
          </View>

          <TextInput
            style={[styles.eventInput, styles.locationInput]}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.timeInput}
            onPress={() => alert('Open Start Time Picker (implement your own)')}
          >
            <Text style={[styles.timeTextInput, !startTime && { color: '#999' }]}>
              {startTime || 'Start Time'}
            </Text>
            <Ionicons name="time-outline" size={18} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.timeInput}
            onPress={() => alert('Open End Time Picker (implement your own)')}
          >
            <Text style={[styles.timeTextInput, !endTime && { color: '#999' }]}>
              {endTime || 'End Time'}
            </Text>
            <Ionicons name="time-outline" size={18} color="#555" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FA', padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },

  logoBox: {
    backgroundColor: '#4B46E4',
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoTitle: { fontWeight: 'bold', fontSize: 18, color: '#222' },
  logoSubtitle: { fontSize: 12, color: '#999' },

  headerRight: { flexDirection: 'row', alignItems: 'center' },

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
    paddingHorizontal: 10,
  },

  timeText: { marginLeft: 6, fontSize: 14, color: '#555' },

  addEventBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B46E4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10,
  },

  addEventTxt: { color: 'white', marginLeft: 6, fontWeight: '500' },

  importBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3CB34A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  importTxt: { color: 'white', marginLeft: 6, fontWeight: '500' },

  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  toggleBtn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#F4F4F7',
  },

  toggleActive: {
    backgroundColor: '#4B46E4',
  },

  toggleText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },

  toggleTextActive: {
    color: 'white',
  },

  addEventContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },

  addEventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  addEventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  eventInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },

  dropdownContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    height: 44,
  },

  picker: {
    width: '100%',
    height: 44,
  },

  locationInput: {
    flex: 1,
  },

  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  timeTextInput: {
    fontSize: 14,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  addBtn: {
    backgroundColor: '#4B46E4',
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  cancelBtn: {
    backgroundColor: '#F0F0F0',
    flex: 1, 
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
},

  cancelBtnText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },

  backContainer: {
  marginBottom: 10,
  marginTop: 10,
  paddingLeft: 10,
},

});
