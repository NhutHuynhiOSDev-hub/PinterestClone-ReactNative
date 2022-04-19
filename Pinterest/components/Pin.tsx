
import { StyleSheet,Text, View, Image } from "react-native";

const Pin = () => {
    return(
        <View style={styles.pin}>
            <Image
                style= {styles.image}
                source={{uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg"}}/>
            <Text style={styles.title}>notJust Hoodie</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    title: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },

    pin: {

        width: "100%",
    },

    image: {
        width: "100%",
        height: 200,
        borderRadius: 25,
    },
});

export default Pin;
  

