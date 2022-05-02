import { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import pins from "../assets/data/pins";
import { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NhostClient } from "@nhost/react";

const nhost = new NhostClient({
  backendUrl: "https://lrsmfbjvjgapfxadtrfu.nhost.run",
});

const PinScreen = () => {
  const [ration, setRation] = useState(1);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  const pinID = route.params?.id;
  const pin = pins.find((item) => item.id === pinID);

  const goBack = () => {
    navigation.goBack();
  };

  if (!pin) {
    return <Text>Pin not found!!</Text>;
  }

  useEffect(() => {
    if (pin.image) {
      Image.getSize(pin.image, (width, height) => {
        setRation(width / height);
      });
    }
  }, [pin.image]);

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ration }]}
        />
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
  image: {
    width: "100%",
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
