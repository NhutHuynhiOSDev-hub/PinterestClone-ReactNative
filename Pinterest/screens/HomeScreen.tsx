import { StyleSheet, Image, ScrollView } from "react-native";

import Pin from "../components/Pin";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Pin
          pin={{
            title: "notJust Dev Hoodie",
            image:
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg",
          }}
        />
        <Pin
          pin={{
            title: "Programmer working on laptop computer in office studio",
            image:
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/1.jpeg",
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
