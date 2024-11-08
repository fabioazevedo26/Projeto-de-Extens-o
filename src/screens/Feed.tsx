import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Feed() {
  return (
    <ScrollView style={styles.container}>
    <View style={styles.container}>
      {/* Cabeçalho com ícones de menu e pesquisa */}
      <View style={ styles.header}>
        <Ionicons name="filter" size={30} color="black" />
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="black" />
          <Text style={styles.searchText}>Pesquisar</Text>
        </View>
        <Ionicons name="person" size={30} color="black" />
      </View>

      {/* Conteúdo de produtos */}
      <View style={styles.productContainer}>
        <View style={styles.productItem}>
          <Image
            source={require('../img/img1.png')} // Substitua pelo caminho correto da sua imagem
            style={styles.productImage}
          />
          <Text style={styles.productName}>PC da XUXA</Text>
          <Text style={styles.productPrice}>R$ 1450,00</Text>
          <Text style={styles.productCategory}>Computador</Text>
        </View>

        <View style={styles.productItem}>
          <Image
            source={require('../img/img2.png')} // Substitua pelo caminho correto da sua imagem
            style={styles.productImage}
          />
          <Text style={styles.productName}>iPhone 17</Text>
          <Text style={styles.productPrice}>R$ 10000,00</Text>
          <Text style={styles.productCategory}>Celular</Text>
        </View>

        <View style={styles.productItem}>
          <Image
            source={require('../img/img3.png')} // Substitua pelo caminho correto da sua imagem
            style={styles.productImage}
          />
          <Text style={styles.productName}>FIAT UNO Com Escada</Text>
          <Text style={styles.productPrice}>R$ 40000,00</Text>
          <Text style={styles.productCategory}>Carro</Text>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  productContainer: {
    padding: 10,
  },
  productItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  productCategory: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  }
});
