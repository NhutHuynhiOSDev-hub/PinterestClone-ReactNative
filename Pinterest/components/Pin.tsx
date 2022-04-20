import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";

const Pin = (props) => {
  const { title, image } = props.pin;
  const onLike = () => {};
  const [ration, setRation] = useState(1);

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setRation(width / height));
    }
  }, [image]);

  return (
    <View style={styles.pin}>
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
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  pin: {
    width: "100%",
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
