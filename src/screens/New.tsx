import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import PhoneAuth from '../components/PhoneAuth';  // Ajuste o caminho para não incluir .expo
import ProductListing from '../components/ProductListing';  // Ajuste o caminho para não incluir .expo
import ShareProduct from '../components/ShareProduct';  // Ajuste o caminho para não incluir .expo

const New: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Box da imagem */}
      <View style={styles.box}>
        <Image 
          source={require('../img/logo.png')} 
          style={styles.image}
        />
      </View>
      
      {/* Texto centralizado abaixo da imagem */}
      <Text style={styles.title}>Cadastro de Produtos</Text>
      
      {/* Componentes adicionais */}
      <PhoneAuth />
      <ProductListing />
      <ShareProduct link="https://meuapp.com/produto/123" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Faz o container ocupar a tela toda
    justifyContent: 'center',  // Centraliza verticalmente
    alignItems: 'center',  // Centraliza horizontalmente
    backgroundColor: '#fff',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'lightblue',
    justifyContent: 'center',  // Centraliza a imagem dentro da View
    alignItems: 'center',
    marginBottom: 20,  // Adiciona espaço abaixo da imagem
  },
  image: {
    width: 150,  // Largura da imagem
    height: 150,  // Altura da imagem
  },
  title: {
    fontSize: 20,  // Tamanho do texto "Cadastro de Produtos"
    marginBottom: 20,  // Espaço entre o título e o próximo componente
    textAlign: 'center',
  },
});

export default New;
