import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { userDetailsContext } from "../components/user-details-context";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isSignedIn, setIsSignedIn, token, setToken, username, setUsername] =
    useContext(userDetailsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    navigation.navigate("SignUp");
  };

  const login = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    fetch(
      "https://e66f-2601-188-c880-8280-8536-884d-f81c-277.ngrok-free.app/login",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        setIsSignedIn(true);
        setUsername(data.username);
      })
      .catch((err) => console.log("Login error:\n" + err)); // DISPLAY ERROR TO USER
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
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        multiline={false}
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, { width: 300 }]} onPress={register}>
          <Text style={[styles.buttonText, { fontWeight: "normal" }]}>
            Create a new account
          </Text>
        </Pressable>
        <Text style={styles.text}>or</Text>
        <Pressable
          style={[styles.button, { backgroundColor: "#F2305F" }]}
          onPress={login}
        >
          <Text style={styles.buttonText}>Login</Text>
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
    marginTop: 30,
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
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
  text: {
    marginBottom: 20,
  },
});

export default LoginScreen;
