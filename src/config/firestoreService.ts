import { firestore } from './firebaseConfig'; // Corrigido para importar firestore
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Importando funções do Firestore

// Função para adicionar um novo produto
export const addProduct = async (product: any) => {
  try {
    const docRef = await addDoc(collection(firestore, 'products'), product);
    console.log('Produto adicionado com ID: ', docRef.id);
  } catch (e) {
    console.error('Erro ao adicionar produto: ', e);
  }
};

// Função para obter produtos
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'products'));
  const products: any[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};
