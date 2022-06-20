import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";

const CREATE_PIN_MUTATION = `
mutation MyMutation($image: String!, $title: String) {
  insert_pins(objects: {image: $image, title: $title}) {
    returning {
      id
      image
      title
      create_at
      user_id
    }
  }
}
`;

export default function CreatePinScreen() {
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [title, setTitle] = useState("");

  const nhost = useNhostClient();
  const navigator = useNavigation();

  const onUploadImage = async () => {
    if (!imageUri) {
      return {
        error: {
          message: "No image selected",
        },
      };
    }

    const parts = imageUri.split("/");
    const name = parts[parts.length - 1];
    const nameParts = name.split(".");
    const extension = nameParts[name.length - 1];
    const uri =
      Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;

    const results = await nhost.storage.upload({
      file: {
        name,
        type: `image/${extension}`,
        uri,
      },
    });
    return results;
  };

  const onSubmit = async () => {
    const uploadResults = await onUploadImage();

    if (uploadResults.error) {
      Alert.alert("Error uploading the image", uploadResults.error.message);
      return;
    }

    const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
      title,
      image: uploadResults.fileMetadata.id,
    });
    console.log(result);
    if (result.error) {
      Alert.alert("Error creating the post", result.error.message);
    } else {
      navigator.goBack();
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Upload you Pin" onPress={pickImage} />
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <TextInput
            style={styles.textInput}
            placeholder="Title..."
            value={title}
            onChangeText={setTitle}
          />
          <Button title="Submit Pin" onPress={onSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 400,
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    borderColor: "gainsboro",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
  },
});
