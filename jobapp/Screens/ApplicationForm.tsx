<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> 8cb02ffed0f7717e3f1630fccf9d37b681da9a2f
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/props';
<<<<<<< HEAD
import { useGlobalContext } from '../context/globalContext';
=======
import { Formik } from 'formik';
import * as Yup from 'yup';
>>>>>>> 8cb02ffed0f7717e3f1630fccf9d37b681da9a2f

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationForm'>;

export default function ApplicationForm({ route }: Props) {
  const { job } = route.params;
<<<<<<< HEAD
  const { isDarkMode } = useGlobalContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const jobKey = `applied_${job.id}`; 

  useEffect(() => {
    const checkIfApplied = async () => {
      const applied = await AsyncStorage.getItem(jobKey);
      if (applied) {
        setIsSubmitted(true);
      }
    };
    checkIfApplied();
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateContact = (contact: string) => /^[0-9]{10,}$/.test(contact);

  const handleSubmit = async () => {
    if (!name || !email || !contact || !reason) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address!');
      return;
    }

    if (!validateContact(contact)) {
      Alert.alert('Error', 'Please enter a valid contact number (10+ digits)!');
      return;
    }

    await AsyncStorage.setItem(jobKey, 'submitted');
    setIsSubmitted(true);

    Alert.alert('Success', `Application for ${job.title} submitted!`);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F5FCFF' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Apply for {job.title}</Text>
      <Text style={[styles.company, { color: isDarkMode ? '#fff' : '#000' }]}>{job.companyName}</Text>

      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Name"
        placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
        value={name}
        onChangeText={setName}
        editable={!isSubmitted}
      />

      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isSubmitted}
      />

      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Contact"
        placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
        editable={!isSubmitted}
      />

      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Why should we hire you?"
        placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
        value={reason}
        onChangeText={setReason}
        multiline
        editable={!isSubmitted}
      />

      <TouchableOpacity
        style={[styles.button, isSubmitted && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isSubmitted}
      >
        <Text style={styles.buttonText}>{isSubmitted ? 'Already Applied' : 'Submit'}</Text>
      </TouchableOpacity>
=======

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.string().required('Contact is required'),
    reason: Yup.string().min(10, 'Must be at least 10 characters').required('This field is required'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for {job.title}</Text>
      <Text style={styles.company}>{job.companyName}</Text>

      <Formik
        initialValues={{ name: '', email: '', contact: '', reason: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          Alert.alert('Success', `Application for ${job.title} submitted!`);
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Contact"
              value={values.contact}
              onChangeText={handleChange('contact')}
            />
            {touched.contact && errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Why should we hire you?"
              value={values.reason}
              onChangeText={handleChange('reason')}
              multiline
            />
            {touched.reason && errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
>>>>>>> 8cb02ffed0f7717e3f1630fccf9d37b681da9a2f
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
<<<<<<< HEAD
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  company: { fontSize: 16, marginBottom: 10 },
  input: { padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
  button: { padding: 10, borderRadius: 5, backgroundColor: '#4A90E2', alignItems: 'center' },
  disabledButton: { backgroundColor: '#aaa' },
  buttonText: { color: 'white', fontSize: 16 },
=======
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  company: { fontSize: 16, marginBottom: 15, color: '#555' },
  input: { padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5, borderColor: '#ccc' },
  textArea: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#4A90E2', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
>>>>>>> 8cb02ffed0f7717e3f1630fccf9d37b681da9a2f
});
