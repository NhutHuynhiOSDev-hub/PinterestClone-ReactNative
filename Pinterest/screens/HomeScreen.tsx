import { useNhostClient } from "@nhost/react";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import MasonryList from "../components/MasonryList";

export default function HomeScreen() {
  const nhost = useNhostClient();
  const [pinList, setPins] = useState([]);

  const fetchPints = async () => {
    const response = await nhost.graphql.request(
      `query MyQuery {
        pins {
          title
          image
          id
          user {
            avatarUrl
            displayName
          }
        }
      }`
    );
    if (response.error) {
      Alert.alert("Error fetching pins");
    } else {
      setPins(response.data.pins);
    }
  };

  useEffect(() => {
    fetchPints();
  }, []);

  return <MasonryList pins={pinList} />;
}
