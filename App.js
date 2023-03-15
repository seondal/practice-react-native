import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const API_KEY = "b316c980441d737b14db685d96bfe1f5";
const SCREEN_WIDTH = Dimensions.get("window").width;

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};
//
function getDateFromTimestamp(timestamp) {
  const date = new Date(1677668320);
  console.log("🚀 ~ file: App.js:28 ~ getDateFromTimestamp ~ date:", date);
  var year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
  var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
  var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
  var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
  var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
  var second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)}

  return { m: month, d: day, h: hour };
}

export default function App() {
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");
  const [weathers, setWeathers] = useState([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 3 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setWeathers(json.list);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        contentContainer
        showsHorizontalScrollIndicator={false}
        Style={styles.weather}>
        {weathers.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          weathers.map(
            (weather, idx) =>
              idx % 8 == 0 && (
                <View style={styles.day} key={idx}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    }}>
                    <Text style={styles.temp}>
                      {parseFloat(weather.main.temp).toFixed(1)}
                    </Text>
                    <Fontisto
                      name={icons[weather.weather[0].main]}
                      size={68}
                      color="white"
                    />
                  </View>
                  <Text style={styles.description}>
                    {weather.weather[0].main}
                  </Text>
                  <Text style={styles.tinyText}>
                    {weather.weather[0].description}
                  </Text>
                  <Text
                    style={{
                      ...styles.description,
                      marginTop: 30,
                    }}>
                    {getDateFromTimestamp(weather.dt).m}월{" "}
                    {getDateFromTimestamp(weather.dt).d}일
                  </Text>
                </View>
              )
          )
        )}
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
    fontSize: 58,
    fontWeight: "500",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 100,
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    color: "white",
    fontWeight: "400",
  },
});
