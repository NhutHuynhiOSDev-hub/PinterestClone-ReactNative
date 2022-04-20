import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Pin = (props) => {
  const { id, title, image } = props.pin;
  const [ration, setRation] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setRation(width / height));
    }
  }, [image]);

  const onLike = () => {};

  const moveToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  return (
    <Pressable onPress={moveToPinPage} style={styles.pin}>
      <View>
        <Image
          style={[styles.image, { aspectRatio: ration }]}
          source={{
            uri: image,
          }}
        />
        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pin: {
    padding: 4,
    width: "100%",
  },
  title: {
    margin: 5,
    fontSize: 16,
    lineHeight: 22,
    color: "#181818",
    fontWeight: "600",
  },
  image: {
    width: "100%",
    borderRadius: 25,
  },

  heartBtn: {
    backgroundColor: "#d3cfd4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});

export default Pin;
