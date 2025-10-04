import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";  


export default function ImportSchedule() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Import Schedule</Text>
      <View style={styles.content}>
        <Text style={styles.text}>This is where you can import your schedule.</Text>
        {/* Add your import functionality here */}
      </View>
    </SafeAreaView>
  );
}