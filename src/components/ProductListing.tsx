import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<any>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const uploadProduct = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);

        if (image) {
            // Convertendo a imagem para um arquivo Blob
            const localUri = image.uri;
            const filename = localUri.split('/').pop();
            const type = 'image/jpeg'; // Ajuste o tipo se necessário

            const file = {
                uri: localUri,
                type,
                name: filename,
            };

            // Criando um Blob a partir do arquivo
            const imageBlob = await fetch(localUri).then(res => res.blob());

            // Anexando a imagem como um Blob
            formData.append('image', imageBlob, filename);
        }

        try {
            const response = await axios.post('http://192.168.0.33/inventory/upload_product.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                alert('Produto cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar o produto');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar dados');
        }
    };

    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.label}>Nome do Produto</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Preço</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />

            <Text style={styles.label}>Categoria</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} />

            <Button title="Selecionar Imagem" onPress={pickImage} />

            {image && <Image source={{ uri: image.uri }} style={styles.image} />}

            <Button title="Cadastrar Produto" onPress={uploadProduct} />
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontWeight: 'bold',
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
});

export default ProductForm;
