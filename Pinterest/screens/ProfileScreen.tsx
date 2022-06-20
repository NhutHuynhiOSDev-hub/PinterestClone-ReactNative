import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";
import { Entypo, Feather } from "@expo/vector-icons";
import { useSignOut } from "@nhost/react";

export default function ProfileScreen() {
  const { signOut } = useSignOut();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>
            <Feather style={styles.icon} size={24} name="log-out" />
          </Pressable>
          <Entypo style={styles.icon} size={24} name="dots-three-horizontal" />
        </View>
        <Image
          style={styles.image}
          source={{
            uri: "https://scontent.fsgn2-2.fna.fbcdn.net/v/t39.30808-1/285271929_3158985987656526_7456455269640217934_n.jpg?stp=dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=AuNajH2aXj4AX-MkT1k&tn=N8PnxO-xbx8x54gk&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT8bgUDdtdE1G2W7WvJMDizmr1pffdNsiJiq08pcStVLFQ&oe=62AC87C6",
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
    backgroundColor: "white",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#181818",
    fontWeight: "600",
    marginTop: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
