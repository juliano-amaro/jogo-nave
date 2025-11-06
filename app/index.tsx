import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Router, router } from "expo-router";

export default function TelaInicial() {
  return (
    <ImageBackground
      source={require("@/assets/images/backgroundtelainicio.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.titulo}>Bem-vindo capitão</Text>
          <Text style={styles.descricao}>
            Você foi encarregado para uma missão muito importante. Sua tarefa é
            navegar pelo espaço sideral, evite os meteoros, encontre e derrote o
            P.A.S.T.E.L. (Plataforma Armada Supersônica de Transporte e
            Eliminação Lunar)
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              router.replace("/game");
            }}
          >
            <Text style={styles.textoBotao}>Jogar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: "60%",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    borderWidth: 2,
    borderColor: "#00ccff",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#00e6ff",
    shadowOpacity: 0.9,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00e6ff",
    textAlign: "center",
    marginTop: 10,
  },
  descricaoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  descricao: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  botao: {
    backgroundColor: "#00ccff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginBottom: 10,
    shadowColor: "#00ffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 12,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
