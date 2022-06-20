import { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";
import RemoteImage from "../components/RemoteImage";

const PinScreen = () => {
  const [pin, setPin] = useState<any>(null);

  const route = useRoute();
  const nhost = useNhostClient();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const pinId = route.params?.id;

  const GET_PIN_QUEY = `
    query MyQuery ($id: uuid!){
      pins_by_pk(id: $id) {
          create_at
          id
          image
          title
          user {
            avatarUrl
            displayName
            id
          }
        }
      }`;

  useEffect(() => {
    fecthPin();
  }, [pinId]);

  const fecthPin = async () => {
    const response = await nhost.graphql.request(GET_PIN_QUEY, { id: pinId });
    console.log("Pin Details", response);
    if (response.error) {
      Alert.alert("Error fetching the pin");
    } else {
      setPin(response.data.pins_by_pk);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (!pin) {
    return <Text style={styles.title}> PIN NOT FOUND</Text>;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <RemoteImage fileId={pin.image} />
        <Text style={styles.title}>{pin.title}</Text>
      </View>
      <Pressable
        onPress={goBack}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name="chevron-back" size={35} color="white" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  backBtn: {
    left: 10,
    position: "absolute",
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 35,
    textAlign: "center",
  },
});

export default PinScreen;
