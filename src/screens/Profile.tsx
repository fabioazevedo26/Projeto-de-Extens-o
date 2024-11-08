import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsScreen: React.FC = () => {
  const [adPreferences, setAdPreferences] = useState<boolean>(false);

  // Função para carregar preferências
  const loadPreferences = async () => {
    try {
      const value = await AsyncStorage.getItem('adPreferences');
      if (value !== null) {
        setAdPreferences(JSON.parse(value));
      }
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
    }
  };

  // Função para salvar preferências
  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem('adPreferences', JSON.stringify(adPreferences));
      Alert.alert('Preferências salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    }
  };

  // Carregar preferências ao montar o componente
  useEffect(() => {
    loadPreferences();
  }, []);

  // Alternar preferências de propaganda
  const toggleAdPreferences = () => setAdPreferences(prevState => !prevState);

  // Função para abrir o link da política de privacidade
  const openPrivacyPolicy = async () => {
    const url = 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'; // URL da política de privacidade
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Não foi possível abrir o link: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Seção de estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="people-outline" size={24} color="black" />
          <Text style={styles.statText}>Número de cliques no link:</Text>
          <Text style={styles.statNumber}>123</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="pricetag-outline" size={24} color="black" />
          <Text style={styles.statText}>Produtos em exposição:</Text>
          <Text style={styles.statNumber}>20</Text>
        </View>
      </View>

      {/* Notificação de privacidade */}
      <View style={styles.privacyContainer}>
        <Ionicons name="shield-checkmark-outline" size={24} color="black" />
        <Text style={styles.privacyText}>
          Esta aplicação coleta dados para melhorar sua experiência. Leia nossa{' '}
          <Text style={styles.link} onPress={openPrivacyPolicy}>
            Política de Privacidade
          </Text>.
        </Text>
      </View>

      {/* Preferências de propaganda */}
      <View style={styles.adPreferencesContainer}>
        <Ionicons name="notifications-outline" size={24} color="black" />
        <Text style={styles.adPreferencesText}>Preferências de Propaganda</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={adPreferences ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleAdPreferences}
          value={adPreferences}
        />
      </View>

      {/* Botão de salvar preferências */}
      <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
        <Text style={styles.saveButtonText}>Salvar Preferências</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  statsContainer: {
    marginVertical: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  statText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  privacyText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  adPreferencesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  adPreferencesText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StatsScreen;
