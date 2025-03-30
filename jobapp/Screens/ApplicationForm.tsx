import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/props';

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationForm'>;

export default function ApplicationForm({ route }: Props) {
  const { job } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !contact || !reason) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    Alert.alert('Success', `Application for ${job.title} submitted!`);
    setName('');
    setEmail('');
    setContact('');
    setReason('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for {job.title}</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contact" value={contact} onChangeText={setContact} />
      <TextInput style={styles.input} placeholder="Why should we hire you?" value={reason} onChangeText={setReason} multiline />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
  button: { padding: 10, borderWidth: 1, borderRadius: 5, backgroundColor: 'green' },
});