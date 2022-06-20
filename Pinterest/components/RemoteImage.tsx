import { useNhostClient } from "@nhost/react";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";

const RemoteImage = ({ fileId }) => {
  const [imageUri, setImageUri] = useState("");
  const [ration, setRation] = useState(1);
  const nhost = useNhostClient();

  const fetchImage = async () => {
    const results = await nhost.storage.getPresignedUrl({ fileId });
    console.log(results);
    if (results.presignedUrl?.url) {
      setImageUri(results.presignedUrl?.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [fileId]);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => setRation(width / height));
    }
  }, [imageUri]);

  if (!imageUri) {
    return <ActivityIndicator size="small" color="#000" />;
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={[styles.image, { aspectRatio: ration }]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 25,
  },
});

export default RemoteImage;
