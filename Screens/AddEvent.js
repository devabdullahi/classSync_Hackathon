import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddEvent() {
  // State
  const navigation = useNavigation()
  const [currentTime, setCurrentTime] = useState('');
  const [view, setView] = useState('calendar');
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Class');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [pickingStart, setPickingStart] = useState(true);

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

  // Initialize end time to 1 hour after start time
  useEffect(() => {
    const defaultEndTime = new Date(startTime);
    defaultEndTime.setHours(startTime.getHours() + 1);
    setEndTime(defaultEndTime);
  }, []);

  const handleStartTimePress = () => {
    setPickingStart(true);
    setShowTimeModal(true);
  };

  const handleEndTimePress = () => {
    setPickingStart(false);
    setShowTimeModal(true);
  };

  const handleTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      if (pickingStart) {
        setStartTime(selectedDate);
        // If new start time is after end time, adjust end time
        if (selectedDate > endTime) {
          const newEndTime = new Date(selectedDate);
          newEndTime.setHours(selectedDate.getHours() + 1);
          setEndTime(newEndTime);
        }
      } else {
        setEndTime(selectedDate);
      }
    }
    setShowTimeModal(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddEvent = () => {
    if (!eventTitle.trim()) {
      alert('Please enter an event title');
      return;
    }

    // Here you would save the event to your state/context/backend
    const eventData = {
      title: eventTitle,
      type: eventType,
      location: location,
      startTime: startTime,
      endTime: endTime,
    };

    console.log('Event added:', eventData);
    
    // Navigate back to home or show success message
    navigation.navigate('Home');
  };

  // Quick time options for convenience
  const quickTimes = [
    { label: '30 min', minutes: 30 },
    { label: '1 hour', minutes: 60 },
    { label: '1.5 hours', minutes: 90 },
    { label: '2 hours', minutes: 120 },
  ];

  const applyQuickTime = (minutes) => {
    const newEndTime = new Date(startTime);
    newEndTime.setMinutes(startTime.getMinutes() + minutes);
    setEndTime(newEndTime);
    setShowTimeModal(false);
  };

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
        </View>
      </View>

      {/* Add New Event */}
      <ScrollView style={styles.addEventContainer}>
        <View style={styles.addEventHeader}>
          <Text style={styles.addEventTitle}>Add New Event</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close-outline" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.eventInput}
          placeholder="Event Title *"
          value={eventTitle}
          onChangeText={setEventTitle}
        />

        <View style={styles.row}>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.picker}
              value={eventType}
              onChangeText={setEventType}
              placeholder="Event Type"
            />
          </View>

          <TextInput
            style={[styles.eventInput, styles.locationInput]}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Time Selection Section */}
        <View style={styles.timeSection}>
          <Text style={styles.sectionLabel}>Time & Duration</Text>
          
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={handleStartTimePress}
            >
              <View>
                <Text style={styles.timeLabel}>Start Time</Text>
                <Text style={styles.timeValue}>
                  {formatTime(startTime)}
                </Text>
                <Text style={styles.dateValue}>
                  {formatDate(startTime)}
                </Text>
              </View>
              <Ionicons name="time-outline" size={18} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timeInput}
              onPress={handleEndTimePress}
            >
              <View>
                <Text style={styles.timeLabel}>End Time</Text>
                <Text style={styles.timeValue}>
                  {formatTime(endTime)}
                </Text>
                <Text style={styles.dateValue}>
                  {formatDate(endTime)}
                </Text>
              </View>
              <Ionicons name="time-outline" size={18} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Duration Display */}
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>
              Duration: {Math.round((endTime - startTime) / (1000 * 60))} minutes
            </Text>
          </View>

          {/* Quick Duration Buttons */}
          <View style={styles.quickTimeContainer}>
            <Text style={styles.quickTimeLabel}>Quick duration:</Text>
            <View style={styles.quickTimeButtons}>
              {quickTimes.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickTimeButton}
                  onPress={() => applyQuickTime(time.minutes)}
                >
                  <Text style={styles.quickTimeText}>{time.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.addBtn, !eventTitle && styles.addBtnDisabled]}
            onPress={handleAddEvent}
            disabled={!eventTitle}
          >
            <Text style={styles.addBtnText}>Add Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimeModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {pickingStart ? 'Start' : 'End'} Time
              </Text>
              <TouchableOpacity onPress={() => setShowTimeModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <DateTimePicker
              value={pickingStart ? startTime : endTime}
              mode="datetime"
              display="spinner"
              onChange={handleTimeChange}
              minuteInterval={5}
              minimumDate={pickingStart ? new Date() : startTime}
            />
            
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => setShowTimeModal(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Updated Styles
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
  backContainer: {
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
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
    paddingHorizontal: 12,
  },
  locationInput: {
    flex: 1,
  },
  timeSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
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
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dateValue: {
    fontSize: 12,
    color: '#666',
  },
  durationContainer: {
    backgroundColor: '#F8F9FF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  durationText: {
    fontSize: 14,
    color: '#4B46E4',
    fontWeight: '500',
  },
  quickTimeContainer: {
    marginTop: 12,
  },
  quickTimeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  quickTimeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickTimeButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  quickTimeText: {
    fontSize: 12,
    color: '#333',
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
  addBtnDisabled: {
    backgroundColor: '#CCCCCC',
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  doneButton: {
    backgroundColor: '#4B46E4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});