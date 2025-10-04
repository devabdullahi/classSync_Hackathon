import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ImportSchedule() {
	const navigation = useNavigation()

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.left}>
					<View style={styles.logoBox}>
						<Ionicons name="calendar-outline" size={24} color="white" />
					</View>
					<View style={{ marginLeft: 8 }}>
						<Text style={styles.title}>ClassSync</Text>
						<Text style={styles.subtitle}>Your unified schedule dashboard</Text>
					</View>
				</View>

				<View style={styles.right}>
					<TouchableOpacity
						style={styles.addEventBtn}
						onPress={() => navigation.navigate('AddEvent')}
					>
						<Ionicons name="add" size={18} color="white" />
						<Text style={styles.addEventTxt}>Add Event</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.backBtn}
						onPress={() => navigation.navigate('Home')}
					>
						<Ionicons name="arrow-back" size={18} color="white" />
						<Text style={styles.backTxt}>Back to Dashboard</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Main Content */}
			<ScrollView contentContainerStyle={styles.scroll}>
				<Text style={styles.mainTitle}>Import Your Schedule</Text>
				<Text style={styles.description}>
					Choose how you'd like to add your classes and events to ClassSync
				</Text>

				{/* Google Calendar */}
				<View style={styles.card}>
					<View style={styles.iconBox}>
						<Ionicons name="calendar" size={28} color="#D9534F" />
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.cardTitle}>Google Calendar</Text>
						<Text style={styles.cardDesc}>
							Sync directly with your Google Calendar for automatic updates
						</Text>
						<TouchableOpacity>
							<Text style={styles.connect}>Connect →</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Canvas LMS */}
				<View style={styles.card}>
					<View style={styles.iconBox}>
						<Ionicons name="book-outline" size={28} color="#F0AD4E" />
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.cardTitle}>Canvas LMS</Text>
						<Text style={styles.cardDesc}>
							Import your course schedule and assignments from Canvas
						</Text>
						<TouchableOpacity>
							<Text style={styles.connect}>Connect →</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F8F9FB' },
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 16,
	},
	left: { flexDirection: 'row', alignItems: 'center' },
	logoBox: {
		backgroundColor: '#4B46E4',
		width: 40,
		height: 40,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: { fontWeight: 'bold', fontSize: 18, color: '#222' },
	subtitle: { fontSize: 12, color: '#999' },
	right: { flexDirection: 'row', alignItems: 'center' },
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
	backBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#3CB34A',
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 6,
	},
	backTxt: { color: 'white', marginLeft: 6, fontWeight: '500' },
	scroll: { padding: 20 },
	mainTitle: { fontWeight: 'bold', fontSize: 22, marginBottom: 6 },
	description: { color: '#555', marginBottom: 24 },
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 16,
		marginBottom: 16,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowRadius: 5,
		elevation: 2,
	},
	iconBox: {
		backgroundColor: '#F9F9F9',
		padding: 12,
		borderRadius: 8,
		marginRight: 12,
	},
	cardTitle: { fontWeight: 'bold', fontSize: 16 },
	cardDesc: { color: '#555', fontSize: 14, marginBottom: 6 },
	connect: { color: '#4B46E4', fontWeight: '500', marginTop: 4 },
})
