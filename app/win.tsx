import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function TelaInicial() {
  return (
    <ImageBackground
      source={require('@/assets/images/fundovoceganhou2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.titulo}>Finalmente conseguimos!</Text>
          <Text style={styles.descricao}>
            Você derrotou o P.A.S.T.E.L e salvou a Terra! Agradecemos por sua coragem e habilidade. A missão foi um sucesso graças a você!
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              router.replace("/")
            }}
          >
            <Text style={styles.textoBotao}>Voltar para o Início</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.79)',
    borderWidth: 2,
    borderColor: '#04ff00ff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#26ff00ff',
    shadowOpacity: 0.9,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#04ff00ff',
    textAlign: 'center',
    marginTop: 10,
  },
  descricaoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  descricao: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  botao: {
    backgroundColor: '#04ff00ff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginBottom: 10,
    shadowColor: '#07d303ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 12,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});