import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, Modal, StyleSheet, ScrollView, TextInput } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function Home() {
  const { isDarkMode, toggleDarkMode, jobs, savedJobs, toggleSaveJob } = useGlobalContext();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Validation schema for search bar
  const searchValidationSchema = Yup.object().shape({
    search: Yup.string().trim().required('Search cannot be empty'),
  });

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Display saved or searched jobs
  const displayedJobs = showSavedJobs
    ? jobs.filter(job => savedJobs.includes(job.id))
    : filteredJobs;

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

      {/* Search Bar with Formik */}
      <Formik
        initialValues={{ search: '' }}
        validationSchema={searchValidationSchema}
        onSubmit={(values) => setSearchQuery(values.search)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.searchBar}
              placeholder="Search jobs..."
              value={values.search}
              onChangeText={handleChange('search')}
              onSubmitEditing={handleSubmit}
              placeholderTextColor={isDarkMode ? '#bbb' : '#555'}
            />
            {touched.search && errors.search && <Text style={styles.errorText}>{errors.search}</Text>}
          </View>
        )}
      </Formik>

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

      {/* Job Description Popup */}
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

                {/* Job Description */}
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

                {/* Apply & Save Job Buttons */}
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => {
                    if (!selectedJob) return;
                    navigation.navigate('ApplicationForm', { job: selectedJob });
                  }}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    savedJobs.includes(selectedJob.id) ? styles.savedButton : {},
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

  // Search Bar
  searchBar: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },

  // Job Card
  jobCard: { padding: 15, marginBottom: 10, borderRadius: 5 },
  jobTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  company: { color: '#fff' },
  noJobsText: { textAlign: 'center', fontSize: 16, marginTop: 20, color: '#888' },

  // Modal
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { padding: 20, borderRadius: 10, width: '90%', alignSelf: 'center' },
  backButton: { fontSize: 16, color: '#4A90E2', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  descriptionContainer: { maxHeight: 250, marginBottom: 10 },

  // Buttons
  applyButton: { backgroundColor: '#4A90E2', padding: 10, borderRadius: 5, marginTop: 10 },
  saveButton: { backgroundColor: '#E67E22', padding: 10, borderRadius: 5, marginTop: 10 },
  savedButton: { backgroundColor: '#2ECC71' },
  buttonText: { color: 'white', textAlign: 'center' },
});
