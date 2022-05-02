import {
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Pin from "./Pin";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

const MasonryList = ({ pins }: IMasonryList) => {
  const width = useWindowDimensions().width;
  const numRows = Math.ceil(width / 350);

  return (
    <ScrollView contentContainerStyle={{ width: "100%" }}>
      <View style={styles.container}>
        {Array.from(Array(numRows)).map((col, colIndex) => (
          <View style={styles.column}>
            {pins
              .filter((_, index) => index % numRows === colIndex)
              .map((pin) => (
                <Pin pin={pin} key={pin.id} />
              ))}
          </View>
        ))}
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
