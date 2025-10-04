import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScheduleItem({ iconColor = '#3b82f6', title, location, time, label }) {
  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: iconColor }]} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>📍 {location}</Text>
        <Text style={styles.time}>{time} {label ? ` • ${label}` : ''}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 6,
    elevation: 1,
  },
  icon: {
    width: 12,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    marginBottom: 4,
  },
  location: {
    color: '#666',
    marginBottom: 4,
  },
  time: {
    color: '#444',
  },
});
