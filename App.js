import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e);
      });
  });

  const renderTodo = ({ item }) => (
    <View style={styles.toDoList}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.completed}>{item.completed}</Text>
    </View>
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <SafeAreaView>
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={keyExtractor}
            style={styles.flatListStyle}
          />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  toDoList: {
    display: "flex",
    flexDirection: "column",
    gap: "2",
    marginBottom: 20,
  },
  title: { color: "black" },
  flatListStyle: { paddingTop: 20, paddingBottom: 20, paddingLeft: 20 },
  completed: {},
});
