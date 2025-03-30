import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/props';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedJobs'>;

export default function SavedJobs({ route }: Props) {
  const { savedJobs } = route.params || { savedJobs: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Jobs</Text>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text>{item.company} - {item.salary}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  jobCard: { padding: 15, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
  jobTitle: { fontSize: 16, fontWeight: 'bold' },
});
