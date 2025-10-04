import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NextUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.small}>Next Up</Text>
      <Text style={styles.title}>Study Group - Algorithms</Text>

      <View style={styles.details}>
        <Text style={styles.detailText}>14:00 - 15:30</Text>
        <Text style={styles.detailText}>📍 Library Room 3A</Text>
      </View>

      <View style={styles.startsIn}>
        <Text style={styles.startsLabel}>Starts in</Text>
        <Text style={styles.startsTime}>25 min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  small: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailText: {
    color: '#444',
  },
  startsIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startsLabel: {
    color: '#666',
  },
  startsTime: {
    fontWeight: '700',
    color: '#333',
  },
});