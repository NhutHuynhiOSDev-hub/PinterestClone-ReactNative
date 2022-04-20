import { StyleSheet, Image, ScrollView, FlatList } from "react-native";

import Pin from "../components/Pin";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import pins from "../assets/data/pins";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {pins
            .filter((_, index) => index % 2 === 0)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
        <View style={{ flex: 1 }}>
          {pins
            .filter((_, index) => index % 2 === 1)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
});
