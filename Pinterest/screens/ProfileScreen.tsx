import { Image, View, Text, StyleSheet, ScrollView } from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{
            uri: "https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-1/278896020_3124338924454566_5678278125694287454_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-6&_nc_sid=7206a8&_nc_ohc=YCNBNleQQ74AX9VoYkO&_nc_ht=scontent.fhan4-2.fna&oh=00_AT9V-ION3guaIuwC77i8yP0qpDdAIi2EsYX_9dNNwHLozQ&oe=62849ED9",
          }}
        />
        <Text style={styles.title}>Nhut Huynh</Text>
        <Text style={styles.subTitle}>1m2 followers | 100 following</Text>
      </View>
      <MasonryList pins={pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#181818",
    fontWeight: "600",
    marginVertical: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
  },
  header: {
    alignItems: "center",
    paddingVertical: 50,
  },
});
