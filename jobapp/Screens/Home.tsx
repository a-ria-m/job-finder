import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Switch, Modal, 
  StyleSheet, ScrollView, TextInput, ActivityIndicator 
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const { isDarkMode, toggleDarkMode, jobs, savedJobs, toggleSaveJob } = useGlobalContext();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500); 
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedJobs = showSavedJobs 
    ? jobs.filter(job => savedJobs.includes(job.id)) 
    : filteredJobs;

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F5FCFF' }]}>
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]}>
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

      {/* Search Bar */}
      {!showSavedJobs && (
        <TextInput
          style={[styles.searchBar, { backgroundColor: isDarkMode ? '#333' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
          placeholder="Search jobs..."
          placeholderTextColor={isDarkMode ? '#BBB' : '#888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color={isDarkMode ? "#4A90E2" : "#000"} style={styles.loading} />
      ) : (
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
      )}

      {/* Job Description Modal */}
      <Modal 
        visible={!!selectedJob} 
        animationType="slide" 
        transparent={true} 
        onRequestClose={() => setSelectedJob(null)}
      >
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
                    li: { color: isDarkMode ? '#fff' : '#000' }
                  }}
                />

                </ScrollView>
                
                {/* Apply Button */}
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => {
                    setSelectedJob(null);
                    navigation.navigate('ApplicationForm', { job: selectedJob });
                  }}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>

                {/* Save Job Button */}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  tabContainer: { flexDirection: 'row' },
  tabText: { fontSize: 18, marginRight: 15, color: '#4A90E2' },
  activeTab: { fontWeight: 'bold', textDecorationLine: 'underline' },
  searchBar: { padding: 10, borderRadius: 5, fontSize: 16, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  loading: { marginTop: 20, alignSelf: 'center' },
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
