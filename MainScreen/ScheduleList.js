import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScheduleItem from './ScheduleItem';

export default function ScheduleList() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Schedule</Text>
      <Text style={styles.sub}>Saturday, October 4, 2025</Text>

      <ScheduleItem 
        iconColor="#3b82f6"
        title="Computer Science 301"
        location="Engineering Hall 204"
        time="09:00 - 10:30"
        label="Class"
      />
      <ScheduleItem 
        iconColor="#7c3aed"
        title="Linear Algebra"
        location="Math Building 115"
        time="11:00 - 12:00"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  sub: {
    color: '#666',
    marginLeft: 12,
    marginBottom: 8,
  },
});