import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        contentContainer
        showsHorizontalScrollIndicator={false}
        Style={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Cloudy</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#005F3B" },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 60,
    fontWeight: "600",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 20,
    fontSize: 178,
  },
  description: {
    marginTop: -20,
    fontSize: 60,
  },
});
