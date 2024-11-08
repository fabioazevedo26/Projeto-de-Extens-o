import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'; // Adicionei o Text aqui
import { auth } from '../config/firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';


const PhoneAuth: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const sendVerification = async () => {
    const appVerifier = new RecaptchaVerifier('recaptcha-container', undefined, auth);
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      console.log('Código enviado:', confirmationResult.verificationId);
    } catch (error) {
      console.log('Erro ao enviar código:', error);
    } 
  };

  const confirmCode = async () => {
    if (verificationId) {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      try {
        const userCredential = await signInWithCredential(auth, credential);
        console.log('Usuário autenticado:', userCredential.user);
      } catch (error) {
        console.log('Erro ao confirmar código:', error);
      }
    }
  };

  return (
    <View >
      {!verificationId ? (
        <>
          <TextInput 
             style={styles.input}
            placeholder="Digite seu número de celular" 
            value={phoneNumber} 
            onChangeText={setPhoneNumber} 
          />
          <Button title="Enviar Código" onPress={sendVerification} />
          
        </>
      ) : (
        <>
          <TextInput 
            placeholder="Digite o código de verificação" 
            value={verificationCode} 
            onChangeText={setVerificationCode} 
          />
          <Button title="Confirmar Código" onPress={confirmCode} />
          <Text>Insira o código que foi enviado para o seu celular.</Text> {/* Use Text aqui */}
        </>
      )}
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

export default PhoneAuth;
