import React, { useState } from 'react';
import { 
  View, Text, TextInput, FlatList, TouchableOpacity, Modal, 
  StyleSheet, ScrollView, Image 
} from 'react-native';
import { useGlobalContext } from '../context/globalContext';

export default function Home() {
  const { jobs, isDarkMode, theme } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Save job
  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prevSavedJobs =>
      prevSavedJobs.includes(jobId) 
        ? prevSavedJobs 
        : [...prevSavedJobs, jobId]
    );
  };

  // Open job details in a modal
  const openJobDetails = (job: any) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>Discover Jobs</Text>
        <TouchableOpacity>
          <Text style={[styles.headerText, { color: theme.dominant }]}>Saved Jobs</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={[styles.searchBar, { borderColor: theme.dominant }]}
        placeholder="Search jobs..."
        placeholderTextColor={theme.text}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Job Listings */}
      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openJobDetails(item)}>
            <View style={[styles.jobCard, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.jobTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.companyText, { color: theme.text }]}>
                {item.companyName} - 💰{item.minSalary} - {item.maxSalary} USD
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={() => handleSaveJob(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {savedJobs.includes(item.id) ? 'Saved' : 'Save Job'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.applyButton]}>
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Job Details Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            {selectedJob && (
              <>
                <Image source={{ uri: selectedJob.companyLogo }} style={styles.logo} />
                <Text style={[styles.modalTitle, { color: theme.text }]}>{selectedJob.title}</Text>
                <Text style={[styles.companyText, { color: theme.text }]}>
                  {selectedJob.companyName}
                </Text>
                <ScrollView>
                  <Text style={[styles.description, { color: theme.text }]}>
                    {selectedJob.description}
                  </Text>
                </ScrollView>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={[styles.closeText, { color: theme.accent }]}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  searchBar: { padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  jobCard: { padding: 15, borderRadius: 5, marginBottom: 10 },
  jobTitle: { fontSize: 16, fontWeight: 'bold' },
  companyText: { fontSize: 14, marginBottom: 5 },
  buttonContainer: { flexDirection: 'row', marginTop: 10 },
  button: { padding: 10, borderRadius: 5, marginRight: 10 },
  saveButton: { backgroundColor: '#d3d3d3' },
  applyButton: { backgroundColor: '#4CAF50' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '90%', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 14, marginTop: 5 },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 10 },
  closeButton: { marginTop: 10, alignSelf: 'center' },
  closeText: { fontSize: 16, fontWeight: 'bold' }
});

export default Home;
