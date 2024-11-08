import React, { useState, useEffect } from 'react';
import { View, TextInput,StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProductListing: React.FC = () => {
  const [product, setProduct] = useState({ name: '', price: '', description: '', imageUrl: '' });

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissão para acessar a galeria!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Acessando o URI corretamente
    if (!result.canceled) {
      setProduct({ ...product, imageUrl: result.assets[0].uri }); // Correção aqui
    }
  };

  return (
    <View>
      <TextInput 
      style={styles.input}
        placeholder="Nome do Produto" 
        value={product.name} 
        onChangeText={(text) => setProduct({ ...product, name: text })}
      />
      <TextInput 
      style={styles.input}
        placeholder="Preço" 
        value={product.price} 
        onChangeText={(text) => setProduct({ ...product, price: text })}
      />
      <TextInput 
      style={styles.input}
        placeholder="Descrição" 
        value={product.description} 
        onChangeText={(text) => setProduct({ ...product, description: text })}
      />
      <Button title="Escolher Imagem" onPress={pickImage} />
      {product.imageUrl ? <Image source={{ uri: product.imageUrl }} style={{ width: 100, height: 100 }} /> : null}
      <Button title="Cadastrar Produto" onPress={() => console.log('Produto cadastrado')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductListing;
