import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/props';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const { isDarkMode, toggleDarkMode, theme, jobs, loading } = useGlobalContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />

      <Text style={{ color: theme.text, fontSize: 20, marginBottom: 10 }}>
        {loading ? "Loading jobs..." : `Fetched ${jobs.length} jobs`}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.dominant} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.jobCard, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.jobTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={{ color: theme.text }}>{item.companyName}</Text>
              <Text style={{ color: theme.text }}>{`Salary: ${item.minSalary} - ${item.maxSalary}`}</Text>
            </View>
          )}
        />
      )}
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
            onPress={() => navigation.navigate('ApplicationForm', { job: item })}
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