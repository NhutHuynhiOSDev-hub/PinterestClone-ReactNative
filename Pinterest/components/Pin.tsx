import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";

const Pin = (props) => {
  const { id, title, image } = props.pin;
  const [imageUri, setImageUri] = useState("");
  const [ration, setRation] = useState(1);
  const navigation = useNavigation();
  const nhost = useNhostClient();

  const fetchImage = async () => {
    const results = await nhost.storage.getPresignedUrl({
      fileId: image,
    });
    console.log(results);
    if (results.presignedUrl?.url) {
      setImageUri(results.presignedUrl?.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [image]);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => setRation(width / height));
    }
  }, [imageUri]);

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
            uri: imageUri,
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
