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
            uri: "https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/273475343_3071556469732812_1474996566542367421_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=RzIa426dCDgAX_cYGxQ&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT_I5uelEr_4ZPbjqGmfJYzEAWm2jeNEUvqZ7TJJohEzWQ&oe=6265B3FC",
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
  },
});
