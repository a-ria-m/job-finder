import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, Modal, StyleSheet, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { isDarkMode, toggleDarkMode, jobs, savedJobs, toggleSaveJob } = useGlobalContext();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const navigation = useNavigation();

  // Filter jobs for saved
  const displayedJobs = showSavedJobs ? jobs.filter(job => savedJobs.includes(job.id)) : jobs;

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F5FCFF' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setShowSavedJobs(false)}>
            <Text style={[styles.tabText, !showSavedJobs && styles.activeTab]}>Discover Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSavedJobs(true)}>
            <Text style={[styles.tabText, showSavedJobs && styles.activeTab]}>Saved Jobs</Text>
          </TouchableOpacity>
        </View>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Job List */}
      <FlatList
        data={displayedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.jobCard, { backgroundColor: isDarkMode ? '#4A90E2' : '#87CEFA' }]}
            onPress={() => setSelectedJob(item)}
          >
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.company}>{item.companyName}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noJobsText}>No jobs found.</Text>}
      />

      {/* Job Description */}
      <Modal visible={!!selectedJob} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1E1E1E' : '#fff' }]}>
            
            {/* Back Button */}
            <TouchableOpacity onPress={() => setSelectedJob(null)}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>

            {/* Job Title & Company */}
            {selectedJob && (
              <>
                <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
                  {selectedJob.title}
                </Text>
                <Text style={[styles.company, { color: isDarkMode ? '#fff' : '#000' }]}>
                  {selectedJob.companyName}
                </Text>

                {/* Job Description thing */}
                <ScrollView style={styles.descriptionContainer}>
                  <RenderHtml
                    contentWidth={300}
                    source={{ html: selectedJob.description }}
                    tagsStyles={{
                      p: { color: isDarkMode ? '#fff' : '#000', fontSize: 14 },
                      strong: { color: isDarkMode ? '#fff' : '#000' },
                    }}
                  />
                </ScrollView>
                
                <TouchableOpacity
  style={styles.applyButton}
  onPress={() => {
    if (!selectedJob) {
      console.error('No job selected');
      return;
    }
    navigation.navigate('ApplicationForm', { job: selectedJob });
  }}
>
  <Text style={styles.buttonText}>Apply</Text>
</TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    savedJobs.includes(selectedJob.id) ? styles.savedButton : {}
                  ]}
                  onPress={() => toggleSaveJob(selectedJob.id)}
                >
                  <Text style={styles.buttonText}>
                    {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save Job'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  
  // Header & Tabs
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tabContainer: { flexDirection: 'row' },
  tabText: { fontSize: 18, marginRight: 15, color: '#4A90E2' },
  activeTab: { fontWeight: 'bold', textDecorationLine: 'underline' },

  jobCard: { padding: 15, marginBottom: 10, borderRadius: 5 },
  jobTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  company: { color: '#fff' },
  noJobsText: { textAlign: 'center', fontSize: 16, marginTop: 20, color: '#888' },

  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { padding: 20, borderRadius: 10, width: '90%', alignSelf: 'center' },
  backButton: { fontSize: 16, color: '#4A90E2', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  descriptionContainer: { maxHeight: 250, marginBottom: 10 },

  applyButton: { backgroundColor: '#4A90E2', padding: 10, borderRadius: 5, marginTop: 10 },
  saveButton: { backgroundColor: '#E67E22', padding: 10, borderRadius: 5, marginTop: 10 },
  savedButton: { backgroundColor: '#2ECC71' },
  buttonText: { color: 'white', textAlign: 'center' },
});
