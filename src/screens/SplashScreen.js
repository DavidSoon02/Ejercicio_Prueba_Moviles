import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants/colors';

/**
 * SplashScreen - Pantalla de bienvenida animada con estilo premium.
 */
export default function SplashScreen({ onFinish }) {
  // ── Valores animados ──
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.2)).current;
  const logoPulse = useRef(new Animated.Value(1)).current;
  const titleTranslateY = useRef(new Animated.Value(40)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const loadingWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Logo: entrada con spring
    Animated.parallel([
      Animated.spring(logoOpacity, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
    ]).start();

    // 2. Pulse sutil del logo después de aparecer
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(logoPulse, { toValue: 3.00, duration: 300, useNativeDriver: true }),
        Animated.timing(logoPulse, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    }, 600);

    // 3. Textos con stagger
    const textDelay = 400;
    Animated.stagger(textDelay, [
      Animated.parallel([
        Animated.timing(titleTranslateY, { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleTranslateY, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();

    // 4. Barra de carga 1.5s
    Animated.timing(loadingWidth, { toValue: 1, duration: 1500, useNativeDriver: false }).start();

    // 5. Auto-navegación
    const timer = setTimeout(() => { if (onFinish) onFinish(); }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const loadingBarWidth = loadingWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.root}>
      {/* Barra bandera */}
      <View style={styles.flagBar}>
        <View style={[styles.flagStripe, { backgroundColor: COLORS.ecuadorYellow }]} />
        <View style={[styles.flagStripe, { backgroundColor: COLORS.darkBlue }]} />
        <View style={[styles.flagStripe, { backgroundColor: COLORS.ecuadorRed }]} />
      </View>

      <View style={styles.body}>
        {/* Logo con glow */}
        <Animated.View style={[styles.glowRing, { opacity: logoOpacity }]} />
        <Animated.View
          style={[
            styles.logoRing,
            { opacity: logoOpacity, transform: [{ scale: Animated.multiply(logoScale, logoPulse) }] },
          ]}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🇪🇨</Text>
          </View>
        </Animated.View>

        {/* Textos */}
        <Animated.Text
          style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }]}
        >
          La Tri
        </Animated.Text>
        <Animated.Text
          style={[styles.subtitle, { opacity: subtitleOpacity, transform: [{ translateY: subtitleTranslateY }] }]}
        >
          Álbum oficial de jugadores
        </Animated.Text>

        {/* Estrellas decorativas */}
        <Animated.Text style={[styles.stars, { opacity: subtitleOpacity }]}>✦ ✦ ✦</Animated.Text>
      </View>

      {/* Barra de carga */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingTrack}>
          <Animated.View style={[styles.loadingFill, { width: loadingBarWidth }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.darkerBlue },
  flagBar: { height: 9, flexDirection: 'row' },
  flagStripe: { flex: 1 },

  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  glowRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(205, 177, 122, 0.12)',
  },

  logoRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    borderWidth: 4,
    borderColor: COLORS.gold,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 14,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoEmoji: { fontSize: 68 },

  title: {
    fontSize: 38,
    fontWeight: '800',
    color: COLORS.ecuadorYellow,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gold,
    textAlign: 'center',
    letterSpacing: 1,
  },
  stars: {
    fontSize: 14,
    color: COLORS.gold,
    marginTop: 18,
    letterSpacing: 6,
    opacity: 0.6,
  },

  loadingContainer: { paddingHorizontal: 50, paddingBottom: 50 },
  loadingTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 2 },
});
