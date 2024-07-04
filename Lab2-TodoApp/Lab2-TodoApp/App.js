import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Switch } from 'react-native';
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, 'tasks');
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksList);
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (taskTitle.trim() !== '') {
      const tasksCollection = collection(db, 'tasks');
      await addDoc(tasksCollection, { title: taskTitle, status: false });
      setTaskTitle('');
      fetchTasks();
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, { status: !currentStatus });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
    fetchTasks();
  };

  const fetchTasks = async () => {
    const tasksCollection = collection(db, 'tasks');
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(tasksList);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={item.status ? styles.doneTask : styles.dueTask}>{item.title}</Text>
      <View style={styles.switchContainer}>
        <Text>Due</Text>
        <Switch
          value={item.status}
          onValueChange={() => toggleTaskStatus(item.id, item.status)}
        />
        <Text>Done</Text>
      </View>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App - Shahbaz</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <Button
          title="Add Task"
          onPress={addTask}
          disabled={!taskTitle.trim()}
        />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 10,
    paddingBottom: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueTask: {
    color: '#000',
  },
  doneTask: {
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    color: 'red',
  },
});
