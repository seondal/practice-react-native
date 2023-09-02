import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./color";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  function onChangeText(e) {
    setText(e);
  }

  function addTodo() {
    if (text == "") {
      return;
    }
    const newTodos = { ...todos, [Date.now()]: { text, work: working } };
    setTodos(newTodos);
    setText("");
    console.log(todos);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "white" : theme.grey,
            }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          returnKeyType="done"
          style={styles.input}
          placeholder={working ? "Add a To Do" : "Where do you want to go?"}
          onChangeText={onChangeText}
          onSubmitEditing={addTodo}
          value={text}
        />
      </View>
      <ScrollView>
        {Object.keys(todos).map((key) => (
          <View key={key} style={styles.todo}>
            <Text style={styles.todoText}>{todos[key].text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    color: "white",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  todo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  todoText: {
    color: "white",
    fontWeight: "500",
  },
});
