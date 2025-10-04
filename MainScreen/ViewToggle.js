import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ViewToggle({ activeView, onChange }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, activeView === 'schedule' && styles.active]}
        onPress={() => onChange('schedule')}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, activeView === 'schedule' && styles.activeText]}>
          Schedule
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, activeView === 'calendar' && styles.active]}
        onPress={() => onChange('calendar')}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, activeView === 'calendar' && styles.activeText]}>
          Calendar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    marginHorizontal: 2,
  },
  active: {
    backgroundColor: '#3b82f6',
  },
  text: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
  activeText: {
    color: '#fff',
  },
});
