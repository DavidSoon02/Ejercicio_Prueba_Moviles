import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import PLAYERS, { CATEGORY_ORDER, getPlayersByCategory } from '../data/players';
import PlayerCard from '../components/PlayerCard';
import PlayerModal from '../components/PlayerModal';

// ── Icono por categoría ──
const CATEGORY_ICON = {
  Arquero: 'shield-checkmark-outline',
  Defensor: 'shield-half-outline',
  Mediocampista: 'football-outline',
  Delantero: 'flame-outline',
};

/**
 * CategorySection - Sección animada con fade + slide up.
 */
function CategorySection({ category, players, onPlayerPress, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const delay = index * 120;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      {/* Línea divisoria decorativa */}
      <View style={styles.sectionDivider}>
        <View style={styles.sectionDividerLine} />
        <View style={styles.sectionDividerDot} />
        <View style={styles.sectionDividerLine} />
      </View>

      <View style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Ionicons name={CATEGORY_ICON[category] || 'grid'} size={16} color={COLORS.ecuadorRed} />
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.categoryCountBadge}>
            <Text style={styles.categoryCountText}>{players.length}</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onPress={() => onPlayerPress(player)}
            />
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  );
}

/**
 * HomeScreen - Pantalla principal tipo álbum Panini.
 */
export default function HomeScreen({ onPlayerPress }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const playersByCategory = getPlayersByCategory();

  const handlePlayerPress = useCallback((player) => {
    setSelectedPlayer(player);
    setModalVisible(true);
    if (onPlayerPress) onPlayerPress(player.id);
  }, [onPlayerPress]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedPlayer(null);
  }, []);

  const totalPlayers = PLAYERS.length;
  const totalCategories = CATEGORY_ORDER.length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBlue} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ═══ HEADER PREMIUM ═══ */}
        <View style={styles.header}>
          <View style={styles.headerFlag}>
            <View style={[styles.flagPart, { backgroundColor: COLORS.ecuadorYellow }]} />
            <View style={[styles.flagPart, { backgroundColor: COLORS.darkBlue }]} />
            <View style={[styles.flagPart, { backgroundColor: COLORS.ecuadorRed }]} />
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerSmall}>Selección Ecuatoriana</Text>
              <Text style={styles.headerTitle}>Álbum La Tri</Text>
              <View style={styles.headerGoldLine} />
            </View>
            <View style={styles.headerLogo}>
              <Ionicons name="football" size={28} color={COLORS.darkerBlue} />
            </View>
          </View>
        </View>

        {/* ═══ TARJETA PRESENTACIÓN ═══ */}
        <View style={styles.presentationCard}>
          <View style={styles.presAccent} />
          <Text style={styles.presTitle}>Plantilla de Ecuador</Text>
          <Text style={styles.presText}>
            Explora los jugadores de la selección como si fueran cartas de un álbum. Presiona una carta para ver más información.
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalPlayers}</Text>
              <Text style={styles.statLabel}>Jugadores</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalCategories}</Text>
              <Text style={styles.statLabel}>Posiciones</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>ECU</Text>
              <Text style={styles.statLabel}>Equipo</Text>
            </View>
          </View>
        </View>

        {/* ═══ CATEGORÍAS ANIMADAS ═══ */}
        {CATEGORY_ORDER.map((category, idx) => {
          const players = playersByCategory[category] || [];
          return (
            <CategorySection
              key={category}
              category={category}
              players={players}
              onPlayerPress={handlePlayerPress}
              index={idx}
            />
          );
        })}
      </ScrollView>

      <PlayerModal visible={modalVisible} player={selectedPlayer} onClose={closeModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.darkBlue },
  scroll: { flex: 1, backgroundColor: COLORS.backgroundGray },
  scrollContent: { paddingBottom: 40 },

  /* ═══ HEADER ═══ */
  header: {
    backgroundColor: COLORS.darkBlue,
    paddingBottom: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerFlag: { flexDirection: 'row', height: 4, width: '100%' },
  flagPart: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  headerLeft: { flex: 1 },
  headerSmall: {
    fontSize: 12,
    color: COLORS.gold,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.ecuadorYellow,
  },
  headerGoldLine: {
    width: 50,
    height: 3,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
    marginTop: 8,
  },
  headerLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.gold,
  },

  /* ═══ TARJETA PRESENTACIÓN ═══ */
  presentationCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    position: 'relative',
    overflow: 'hidden',
  },
  presAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: COLORS.gold,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  presTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkerBlue,
    marginBottom: 6,
    marginLeft: 4,
  },
  presText: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 19,
    marginBottom: 16,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    paddingVertical: 14,
  },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 20, fontWeight: '800', color: COLORS.darkBlue },
  statLabel: { fontSize: 11, color: COLORS.gray, marginTop: 2, letterSpacing: 0.5 },
  statDivider: { width: 1, height: 30, backgroundColor: COLORS.cardBorder },

  /* ═══ DIVISORES ENTRE SECCIONES ═══ */
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionDividerLine: { flex: 1, height: 1, backgroundColor: COLORS.cardBorder },
  sectionDividerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.ecuadorRed,
    marginHorizontal: 12,
  },

  /* ═══ CATEGORÍAS ═══ */
  categorySection: { marginTop: 14, paddingHorizontal: 16 },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.darkerBlue,
    flex: 1,
    marginLeft: 8,
  },
  categoryCountBadge: {
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  categoryCountText: { fontSize: 12, fontWeight: '700', color: COLORS.ecuadorYellow },

  /* ═══ CARTAS ═══ */
  cardsRow: { paddingLeft: 4, paddingRight: 16, paddingVertical: 6 },
});
