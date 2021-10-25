import React from "react";
import { View, Image, ImageBackground, Text, TouchableOpacity } from "react-native"

import styles from "./styles"

export default function Home(){
  return (
    <ImageBackground 
      source={require("../../assets/home-background.png")} 
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")}/>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => {}}>
        <View style={styles.buttonIcon}></View>
        <Text style={styles.buttonText}> Entrar </Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}