import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default function TelaFimDeJogo() {
  return (
    <ImageBackground
          source={require('@/assets/images/backgroundtelainicio.jpg')}
          style={styles.background}
          resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.titulo}>P.A.S.T.E.L Venceu dessa vez...</Text>
          <Text style={styles.descricao}>
            Infelizmente perdemos conexão com a nave do capitão... Central, prepare outra nave e envie outro capitão para a missão. Desta vez, não podemos falhar!
          </Text>

          <TouchableOpacity
            style={styles.botao}
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderWidth: 2,
    borderColor: '#ff0000ff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#ff2525ff',
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
    color: '#ff0000ff',
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
    backgroundColor: '#00ccff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginBottom: 10,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 12,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});