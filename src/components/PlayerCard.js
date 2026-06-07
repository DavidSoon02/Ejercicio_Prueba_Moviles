import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { getPlayerImage } from '../services/playerApi';

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

export default function PlayerCard({ player, onPress }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const iconName = getPositionIcon(player.position);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getPlayerImage(player.name).then((url) => {
      if (mounted) {
        setImageUrl(url);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [player.name]);

  const showImage = imageUrl && !loading;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      {/* Franja bandera */}
      <View style={styles.flagStrip}>
        <View style={[styles.flagPart, { backgroundColor: COLORS.ecuadorYellow }]} />
        <View style={[styles.flagPart, { backgroundColor: COLORS.darkBlue }]} />
        <View style={[styles.flagPart, { backgroundColor: COLORS.ecuadorRed }]} />
      </View>

      {/* Dorsal */}
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{player.number}</Text>
      </View>

      {/* ECU */}
      <View style={styles.ecuBadge}>
        <Text style={styles.ecuText}>ECU</Text>
      </View>

      {/* Avatar: imagen real o genérico */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarRing}>
          <View style={styles.avatarCircle}>
            {showImage ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name={iconName} size={30} color={COLORS.darkBlue} />
            )}
          </View>
        </View>
      </View>

      {/* Nombre */}
      <Text style={styles.playerName} numberOfLines={2}>
        {player.name}
      </Text>

      {/* Posición */}
      <View style={styles.positionBadge}>
        <Text style={styles.positionText} numberOfLines={1}>
          {player.position}
        </Text>
      </View>

      {/* Divisor */}
      <View style={styles.divider} />

      {/* Hint */}
      <Text style={styles.tapHint}>Toca para ver info</Text>
    </Pressable>
  );
}

const CARD_WIDTH = 152;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingTop: 0,
    paddingBottom: 10,
    paddingHorizontal: 8,
    marginRight: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: 0.93 }],
    borderColor: COLORS.ecuadorYellow,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 8,
  },

  flagStrip: {
    flexDirection: 'row',
    height: 6,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  flagPart: { flex: 1 },

  numberBadge: {
    position: 'absolute',
    top: 16,
    left: 10,
    zIndex: 5,
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: COLORS.darkerBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  numberText: { color: COLORS.ecuadorYellow, fontSize: 14, fontWeight: '800' },

  ecuBadge: {
    position: 'absolute',
    top: 16,
    right: 10,
    zIndex: 5,
    backgroundColor: COLORS.ecuadorRed,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: COLORS.white,
  },
  ecuText: { color: COLORS.white, fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },

  avatarContainer: { marginBottom: 8, marginTop: 4 },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },

  playerName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.darkerBlue,
    textAlign: 'center',
    minHeight: 28,
    lineHeight: 15,
  },

  positionBadge: {
    backgroundColor: COLORS.ecuadorRed,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 5,
    maxWidth: CARD_WIDTH - 20,
  },
  positionText: {
    fontSize: 9,
    color: COLORS.white,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  divider: {
    width: '45%',
    height: 1.5,
    backgroundColor: COLORS.gold,
    marginTop: 7,
    marginBottom: 6,
    borderRadius: 1,
  },

  tapHint: {
    fontSize: 9,
    color: COLORS.lightGray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
