import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import TopBar from './MainScreen/TopBar';
import NextUp from './MainScreen/NextUp';
import ScheduleList from './MainScreen/ScheduleList';
import ViewToggle from './MainScreen/ViewToggle';
import AddEvent from './Screens/AddEvent';
import ImportSchedule from './Screens/ImportSchedule';

// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Placeholder screen for now
function HomeScreen() {
  const [view, setView] = useState('schedule');

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.content}>
        <ViewToggle activeView={view} onChange={setView} />
        {view === 'schedule' ? <ScheduleList /> : <NextUp />}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddEvent" component={AddEvent} />
          <Stack.Screen name="ImportSchedule" component={ImportSchedule} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 80, // leave space for top bar if it's absolute
    paddingBottom: 24,
  },
});
