import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { jobs, loading } = useGlobalContext();
  const navigation = useNavigation();

  console.log("Jobs in Home:", jobs); // Debugging log

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3971ef" />
        <Text style={styles.loadingText}>Loading Jobs...</Text>
      </View>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No jobs available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 

          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.company}>{item.companyName}</Text>
            <Text style={styles.jobType}>{item.jobType} - {item.workModel}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: 'gray',
  },
  jobType: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
  },
});
