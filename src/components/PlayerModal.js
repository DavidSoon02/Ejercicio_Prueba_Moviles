import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { getPlayerImage } from '../services/playerApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 48, 380);

const POSITION_ICONS = {
  Portero: 'shield-checkmark',
  'Defensa central': 'shield',
  'Lateral derecho': 'arrow-forward',
  'Lateral izquierdo': 'arrow-back',
  Mediocentro: 'radio',
  'Mediocentro defensivo': 'shield-half',
  'Mediocentro ofensivo': 'flash',
  Mediapunta: 'star',
  'Extremo derecho': 'trending-up',
  'Extremo izquierdo': 'trending-down',
  Extremo: 'swap-horizontal',
  Delantero: 'football',
  'Delantero centro': 'flame',
};

const getPositionIcon = (position) => POSITION_ICONS[position] || 'person';

export default function PlayerModal({ visible, player, onClose }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!player) return;

    let mounted = true;
    setLoading(true);
    setImageUrl(null);

    getPlayerImage(player.name).then((url) => {
      if (mounted) {
        setImageUrl(url);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [player?.name, visible]);

  if (!player) return null;

  const iconName = getPositionIcon(player.position);
  const showImage = imageUrl && !loading;

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} centerContent>
          <View style={styles.card}>
            {/* Cerrar */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>

            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.headerFlag}>
                <View style={[styles.flagPart, { backgroundColor: COLORS.ecuadorYellow }]} />
                <View style={[styles.flagPart, { backgroundColor: COLORS.darkBlue }]} />
                <View style={[styles.flagPart, { backgroundColor: COLORS.ecuadorRed }]} />
              </View>
              <View style={styles.headerNumberBox}>
                <Text style={styles.headerNumber}>{player.number}</Text>
              </View>
              <View style={styles.headerEcuBadge}>
                <Text style={styles.headerEcuText}>ECU</Text>
              </View>
            </View>

            {/* AVATAR: imagen real o genérico */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarOuter}>
                <View style={styles.avatarInner}>
                  {showImage ? (
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.avatarImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons name={iconName} size={44} color={COLORS.darkBlue} />
                  )}
                </View>
              </View>
            </View>

            {/* NOMBRE + POSICIÓN */}
            <Text style={styles.playerName}>{player.name}</Text>
            <View style={styles.positionBadge}>
              <Ionicons name={iconName} size={13} color={COLORS.white} style={{ marginRight: 6 }} />
              <Text style={styles.positionText}>{player.position}</Text>
            </View>

            {/* SECCIÓN: INFORMACIÓN */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="information-circle" size={18} color={COLORS.gold} />
                <Text style={styles.sectionTitle}>Información del jugador</Text>
              </View>
              <View style={styles.sectionDivider} />
              <Text style={styles.description}>{player.description}</Text>
            </View>

            {/* SECCIÓN: DATOS GENERALES */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="list" size={18} color={COLORS.gold} />
                <Text style={styles.sectionTitle}>Datos generales</Text>
              </View>
              <View style={styles.sectionDivider} />
              <View style={styles.dataGrid}>
                <View style={styles.dataItem}>
                  <View style={styles.dataIconBox}>
                    <Ionicons name="flag" size={18} color={COLORS.darkBlue} />
                  </View>
                  <View style={styles.dataContent}>
                    <Text style={styles.dataLabel}>País</Text>
                    <Text style={styles.dataValue}>Ecuador</Text>
                  </View>
                </View>
                <View style={styles.dataItem}>
                  <View style={styles.dataIconBox}>
                    <Ionicons name="people" size={18} color={COLORS.darkBlue} />
                  </View>
                  <View style={styles.dataContent}>
                    <Text style={styles.dataLabel}>Categoría</Text>
                    <Text style={styles.dataValue}>{player.category}</Text>
                  </View>
                </View>
                <View style={styles.dataItem}>
                  <View style={styles.dataIconBox}>
                    <Ionicons name="shirt" size={18} color={COLORS.darkBlue} />
                  </View>
                  <View style={styles.dataContent}>
                    <Text style={styles.dataLabel}>Número</Text>
                    <Text style={styles.dataValue}>#{player.number}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* BOTÓN */}
            <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.85}>
              <Ionicons name="arrow-back" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
              <Text style={styles.backBtnText}>Volver al álbum</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(4, 20, 63, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 18,
    overflow: 'visible',
  },

  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  header: {
    width: '100%',
    backgroundColor: COLORS.darkBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 0,
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerFlag: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  flagPart: { flex: 1 },
  headerNumberBox: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3.5,
    borderColor: COLORS.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  headerNumber: { fontSize: 32, fontWeight: '900', color: COLORS.darkerBlue },
  headerEcuBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: COLORS.ecuadorRed,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  headerEcuText: { color: COLORS.white, fontSize: 12, fontWeight: '900', letterSpacing: 1.8 },

  avatarWrapper: { marginTop: -40, zIndex: 10, marginBottom: 14 },
  avatarOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  playerName: { fontSize: 22, fontWeight: '800', color: COLORS.darkerBlue, textAlign: 'center', marginBottom: 8 },

  positionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ecuadorRed,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  positionText: { color: COLORS.white, fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },

  section: { width: '100%', paddingHorizontal: 20, marginBottom: 18 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.darkerBlue, marginLeft: 8, textTransform: 'uppercase', letterSpacing: 0.6 },
  sectionDivider: { width: '100%', height: 1.5, backgroundColor: COLORS.gold, marginBottom: 10, borderRadius: 1 },

  description: { fontSize: 14, color: COLORS.darkGray, lineHeight: 22, textAlign: 'justify' },

  dataGrid: { backgroundColor: COLORS.backgroundGray, borderRadius: 14, padding: 14, gap: 10 },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  dataIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataContent: { marginLeft: 12, flex: 1 },
  dataLabel: { fontSize: 11, color: COLORS.gray, textTransform: 'uppercase', letterSpacing: 0.6 },
  dataValue: { fontSize: 16, fontWeight: '700', color: COLORS.darkerBlue, marginTop: 2 },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkerBlue,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    marginTop: 6,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  backBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});
