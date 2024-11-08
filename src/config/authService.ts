import { auth } from './firebaseConfig'; // Importa a configuração do Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa a função de login

// Função para autenticar usuário com email e senha
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Usuário autenticado:', userCredential.user);
    return userCredential.user; // Retorna o usuário autenticado
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    throw error; // Lança o erro para que possa ser tratado onde a função é chamada
  }
};
