import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    };
    fetch(
      "https://e66f-2601-188-c880-8280-8536-884d-f81c-277.ngrok-free.app/register",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        navigation.navigate("Login");
      })
      .catch((err) => console.log("Sign up error:\n" + err)); // DISPLAY ERROR TO USER
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        multiline={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        multiline={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        multiline={false}
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: "#F2305F" }]}
          onPress={register}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  input: {
    margin: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
    padding: 10,
    elevation: 3,
    width: 150,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "black",
  },
});

export default SignupScreen;
