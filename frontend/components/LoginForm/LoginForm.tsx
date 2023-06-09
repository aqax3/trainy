import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Registration: undefined;
    Login: undefined;
    Home: {username: string};
  };
  
  type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
  >;
  
  type Props = {
    navigation: LoginScreenNavigationProp;
  };

export default function LoginForm({navigation}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.110:5000/login-user",
        {
          username,
          password,
        }
      );

      console.log(response.data);
      setUsername("");
      setPassword("");
      setLoginStatus("Login successful!");

      console.log(response.data.userToken);

      await AsyncStorage.setItem('userToken', response.data.userToken);
      await AsyncStorage.setItem('username', response.data.user.username);

      navigation.navigate('Home', {username: response.data.user.username});
    } catch (error) {
      console.error(error);
      setLoginStatus("Login failed!");
    }
  };

  return (
    <View style={styles.container}>
      <Text>{loginStatus}</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={loginUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
});
