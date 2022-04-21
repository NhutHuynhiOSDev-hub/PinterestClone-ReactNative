import { ScrollView, View, StyleSheet } from "react-native";
import Pin from "./Pin";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

const MasonryList = ({ pins }: IMasonryList) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 0)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 1)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
  },
  column: {
    flex: 1,
  },
});

export default MasonryList;
