import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Button, Alert, TextInput, Modal, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Feed() {
  const [products, setProducts] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://192.168.0.33/inventory/get_products.php');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const handleEdit = (product: any) => {
    setCurrentProduct(product);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
        console.log('Enviando dados para atualização:', currentProduct);
        const response = await axios.post('http://192.168.0.33/inventory/update_product.php', {
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            description: currentProduct.description,
            category: currentProduct.category,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Resposta da API de atualização:', response.data);
        if (response.data.success) {
            setProducts((prevProducts) => prevProducts.map((product) =>
                product.id === currentProduct.id ? currentProduct : product
            ));
            Alert.alert('Produto Atualizado', 'Produto atualizado com sucesso.');
            setModalVisible(false);
        } else {
            Alert.alert('Erro', response.data.message || 'Erro ao atualizar o produto.');
        }
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        Alert.alert('Erro', 'Erro ao atualizar o produto.');
    }
  };

  const handleDelete = async (productId: number) => {
    try {
        console.log('Enviando dados para exclusão:', { id: productId });
        const response = await axios.post('http://192.168.0.33/inventory/delete_product.php', { id: productId }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Resposta da API de exclusão:', response.data);
        if (response.data.success) {
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            Alert.alert('Produto Excluído', 'Produto excluído com sucesso.');
        } else {
            Alert.alert('Erro', response.data.message || 'Erro ao excluir o produto.');
        }
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        Alert.alert('Erro', 'Erro ao excluir o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Ionicons name="filter" size={30} color="black" />
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="black" />
            <Text style={styles.searchText}>Pesquisar</Text>
          </View>
          <Ionicons name="person" size={30} color="black" />
        </View>

        <View style={styles.productContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${product.image_data}` }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>R$ {product.price}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Editar" onPress={() => handleEdit(product)} />
                <Button title="Excluir" onPress={() => handleDelete(product.id)} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {currentProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Nome do Produto"
                value={currentProduct.name}
                onChangeText={(text) => setCurrentProduct({ ...currentProduct, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Preço"
                value={currentProduct.price}
                onChangeText={(text) => setCurrentProduct({ ...currentProduct, price: text })}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Categoria"
                value={currentProduct.category}
                onChangeText={(text) => setCurrentProduct({ ...currentProduct, category: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={currentProduct.description}
                onChangeText={(text) => setCurrentProduct({ ...currentProduct, description: text })}
              />
              <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={handleSave} />
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',  // Cor de fundo neutra
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',  // Cor neutra para o cabeçalho
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',  // Cor neutra para o texto
  },
  productContainer: {
    padding:  10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',  // Cor neutra para a borda
    borderRadius: 15,  // Bordas arredondadas mais elegantes
    padding: 10,
    backgroundColor: '#fff',  // Fundo branco neutro
    shadowColor: '#000',  // Sombra para dar profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,  // Sombras para dispositivos Android
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 10,  // Bordas arredondadas nas imagens
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',  // Cor neutra para o texto
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
  },
  productDescription: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'red',
  },
});
