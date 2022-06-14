import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNhostClient, useSignOut, useUserId } from "@nhost/react";
import { useEffect, useState } from "react";

const FETCH_USER_PROFILE = `query MyQuery($id: uuid!) {
  user(id: $id) {
    avatarUrl
    displayName
    id
    pins {
      id
      image
      title
      create_at
    }
  }
}`;

export default function ProfileScreen() {
  const [user, setUser] = useState();
  const { signOut } = useSignOut();
  const nhost = useNhostClient();
  const userId = useUserId();

  useEffect(() => {
    fectchUserData();
  });

  const fectchUserData = async () => {
    const results = await nhost.graphql.request(FETCH_USER_PROFILE, {
      id: userId,
    });
    if (results.error) {
      Alert.alert("FETCHING USER DATA ERROR", results.error);
    }

    setUser(results.data.user);
  };

  if (!user) {
    return <ActivityIndicator size="large" color="#000" />;
  }

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
            uri: user.avatarUrl,
          }}
        />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subTitle}>1m2 followers | 100 following</Text>
      </View>
      <MasonryList pins={user.pins} onRefesh={fectchUserData} />
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
