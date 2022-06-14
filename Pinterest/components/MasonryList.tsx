import {
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import Pin from "./Pin";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
  refreshing: boolean;
  onRefesh?: () => void;
}

const MasonryList = ({
  pins,
  refreshing = false,
  onRefesh = () => {},
}: IMasonryList) => {
  const width = useWindowDimensions().width;
  const numRows = Math.ceil(width / 350);

  return (
    <ScrollView
      contentContainerStyle={{ width: "100%" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefesh} />
      }
    >
      <View style={styles.container}>
        {Array.from(Array(numRows)).map((col, colIndex) => (
          <View style={styles.column} key={`colunm_${colIndex}`}>
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
