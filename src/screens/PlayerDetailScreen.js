import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

/**
 * PlayerDetailScreen - Muestra la información detallada de un jugador
 */
export default function PlayerDetailScreen({ route, onBack }) {
  // En una versión futura, route.params contendrá el ID del jugador
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>📋 Detalle del Jugador</Text>
      <Text style={styles.subtitle}>Aquí se mostrará la info del jugador</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.darkerBlue,
    borderRadius: 20,
  },
  backText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 10,
  },
});
