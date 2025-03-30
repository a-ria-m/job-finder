import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/props';
import { Formik } from 'formik';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationForm'>;

export default function ApplicationForm({ route }: Props) {
  const { job } = route.params;

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  company: { fontSize: 16, marginBottom: 15, color: '#555' },
  input: { padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5, borderColor: '#ccc' },
  textArea: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#4A90E2', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
});
