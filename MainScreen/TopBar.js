import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TopBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ClassSync</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('AddEvent')} // Navigate to AddEvent screen
        >
          <Text style={styles.buttonText}>Add Event</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.importButton]} 
          //onPress={() => navigation.navigate('ImportSchedule')} Navigate to ImportSchedule screen
        >
          <Text style={styles.importButtonText}>Import Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 100,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#ffffff20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  importButton: {
    backgroundColor: '#ffffff',
  },
  importButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 14,
  },
});
