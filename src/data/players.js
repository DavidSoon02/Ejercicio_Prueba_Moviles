/**
 * Plantilla completa de la Selección Ecuatoriana de Fútbol
 *
 * Cada jugador:
 *   id           → identificador único
 *   name         → nombre completo
 *   position     → posición específica en el campo
 *   category     → categoría general (Arquero | Defensor | Mediocampista | Delantero)
 *   number       → dorsal
 *   description  → breve reseña del jugador
 */

export const CATEGORIES = {
  GOALKEEPER: 'Arquero',
  DEFENDER: 'Defensor',
  MIDFIELDER: 'Mediocampista',
  FORWARD: 'Delantero',
};

export const CATEGORY_ORDER = [
  CATEGORIES.GOALKEEPER,
  CATEGORIES.DEFENDER,
  CATEGORIES.MIDFIELDER,
  CATEGORIES.FORWARD,
];

const PLAYERS = [
  // =====================================================================
  // ARQUEROS
  // =====================================================================
  {
    id: '1',
    name: 'Hernán Galíndez',
    position: 'Portero',
    category: CATEGORIES.GOALKEEPER,
    number: 1,
    description:
      'Arquero titular de La Tri. Seguro bajo los tres palos, destaca por su liderazgo, juego aéreo y experiencia en eliminatorias.',
  },
  {
    id: '2',
    name: 'Gonzalo Valle',
    position: 'Portero',
    category: CATEGORIES.GOALKEEPER,
    number: 12,
    description:
      'Portero joven con grandes reflejos. Formado en las inferiores de Guayaquil, representa el recambio generacional en el arco ecuatoriano.',
  },
  {
    id: '3',
    name: 'Moisés Ramírez',
    position: 'Portero',
    category: CATEGORIES.GOALKEEPER,
    number: 22,
    description:
      'Canterano de Independiente del Valle. Ágil, rápido de piernas y con notable capacidad para detener penales.',
  },

  // =====================================================================
  // DEFENSORES
  // =====================================================================
  {
    id: '4',
    name: 'Ángelo Preciado',
    position: 'Lateral derecho',
    category: CATEGORIES.DEFENDER,
    number: 17,
    description:
      'Lateral de gran proyección ofensiva. Veloz, agresivo en la marca y con buen centro al área. Pieza clave en la banda derecha.',
  },
  {
    id: '5',
    name: 'Willian Pacho',
    position: 'Defensa central',
    category: CATEGORIES.DEFENDER,
    number: 6,
    description:
      'Defensa central zurdo elegante en la salida. Destaca por su anticipación, serenidad con balón y madurez táctica pese a su juventud.',
  },
  {
    id: '6',
    name: 'Piero Hincapié',
    position: 'Defensa central',
    category: CATEGORIES.DEFENDER,
    number: 3,
    description:
      'Titular indiscutible en el Bayer Leverkusen. Defensa completo: fuerte en el uno contra uno, rápido al corte y con gol en balón parado.',
  },
  {
    id: '7',
    name: 'Félix Torres',
    position: 'Defensa central',
    category: CATEGORIES.DEFENDER,
    number: 2,
    description:
      'Roca defensiva de gran presencia física. Domina el juego aéreo en ambas áreas y aporta goles importantes en jugadas de estrategia.',
  },
  {
    id: '8',
    name: 'Jackson Porozo',
    position: 'Defensa central',
    category: CATEGORIES.DEFENDER,
    number: 4,
    description:
      'Central corpulento formado en Europa. Va bien por arriba, tiene buen timing en el tackle y sabe jugar la pelota desde el fondo.',
  },
  {
    id: '9',
    name: 'Joel Ordóñez',
    position: 'Defensa central',
    category: CATEGORIES.DEFENDER,
    number: 14,
    description:
      'Joven promesa de la defensa ecuatoriana. Correcto en los cruces, buena lectura de juego y margen de mejora importante.',
  },
  {
    id: '10',
    name: 'Pervis Estupiñán',
    position: 'Lateral izquierdo',
    category: CATEGORIES.DEFENDER,
    number: 7,
    description:
      'Dueño del carril zurdo. Recorrido infinito, excelente centro y experiencia en la Premier League con el Brighton.',
  },
  {
    id: '11',
    name: 'Yaimar Medina',
    position: 'Lateral izquierdo',
    category: CATEGORIES.DEFENDER,
    number: 26,
    description:
      'Lateral emergente de gran despliegue físico. Se incorpora con criterio al ataque y cumple con solvencia en tareas defensivas.',
  },

  // =====================================================================
  // MEDIOCAMPISTAS
  // =====================================================================
  {
    id: '12',
    name: 'Alan Franco',
    position: 'Mediocentro defensivo',
    category: CATEGORIES.MIDFIELDER,
    number: 21,
    description:
      'Contención con mucho oficio. Sabe posicionarse, recupera balones y entrega con criterio. Equilibra al equipo en la medular.',
  },
  {
    id: '13',
    name: 'Moisés Caicedo',
    position: 'Mediocentro',
    category: CATEGORIES.MIDFIELDER,
    number: 23,
    description:
      'El motor de La Tri. Mediocentro total: recupera, distribuye, llega al área y marca el ritmo. Figura del Chelsea en la Premier League.',
  },
  {
    id: '14',
    name: 'Pedro Vite',
    position: 'Mediocentro ofensivo',
    category: CATEGORIES.MIDFIELDER,
    number: 5,
    description:
      'Centrocampista de buen pie y llegada. Combina técnica con sacrificio defensivo. Capaz de filtrar pases entre líneas.',
  },
  {
    id: '15',
    name: 'Kendry Páez',
    position: 'Mediapunta',
    category: CATEGORIES.MIDFIELDER,
    number: 10,
    description:
      'La joya del fútbol ecuatoriano. Creatividad, gambeta y visión de juego. Con apenas 18 años ya marca diferencias en cada partido.',
  },
  {
    id: '16',
    name: 'Jordy Alcívar',
    position: 'Mediocentro',
    category: CATEGORIES.MIDFIELDER,
    number: 8,
    description:
      'Pivote con muy buen manejo de balón. Buena pegada de media distancia, criterio táctico y temple para jugar bajo presión.',
  },
  {
    id: '17',
    name: 'Denil Castillo',
    position: 'Mediocentro',
    category: CATEGORIES.MIDFIELDER,
    number: 15,
    description:
      'Volante mixto de gran despliegue. Corre los 90 minutos con la misma intensidad. Se suma al ataque con peligro.',
  },
  {
    id: '18',
    name: 'Anthony Valencia',
    position: 'Extremo derecho',
    category: CATEGORIES.MIDFIELDER,
    number: 18,
    description:
      'Extremo potente y encarador. Le pega con ambas piernas, desborda con facilidad y tiene buen disparo desde fuera del área.',
  },
  {
    id: '19',
    name: 'Alan Minda',
    position: 'Extremo',
    category: CATEGORIES.MIDFIELDER,
    number: 11,
    description:
      'Atacante rápido e incisivo. Destaca en el uno contra uno, cambia de ritmo con facilidad y es un dolor de cabeza para los laterales.',
  },

  // =====================================================================
  // DELANTEROS
  // =====================================================================
  {
    id: '20',
    name: 'Enner Valencia',
    position: 'Delantero centro',
    category: CATEGORIES.FORWARD,
    number: 13,
    description:
      'Capitán y máximo goleador histórico de la Selección Ecuatoriana. Potencia, olfato de gol y liderazgo dentro y fuera de la cancha.',
  },
  {
    id: '21',
    name: 'Kevin Rodríguez',
    position: 'Delantero centro',
    category: CATEGORIES.FORWARD,
    number: 9,
    description:
      'Ariete de gran envergadura física. Juega bien de espaldas, gana duelos aéreos y es una referencia ofensiva constante.',
  },
  {
    id: '22',
    name: 'Gonzalo Plata',
    position: 'Extremo derecho',
    category: CATEGORIES.FORWARD,
    number: 19,
    description:
      'Extremo habilidoso con velocidad y gambeta. Capaz de desequilibrar por sí solo y generar ocasiones de gol de la nada.',
  },
  {
    id: '23',
    name: 'John Yeboah',
    position: 'Extremo izquierdo',
    category: CATEGORIES.FORWARD,
    number: 20,
    description:
      'Atacante versátil de doble nacionalidad. Rápido, con buen disparo de media distancia y capacidad para jugar por ambas bandas.',
  },
  {
    id: '24',
    name: 'Nilson Angulo',
    position: 'Extremo',
    category: CATEGORIES.FORWARD,
    number: 24,
    description:
      'Joven delantero de gran proyección. Explosivo en espacios reducidos, buen regate y cada vez más preciso en la definición.',
  },
  {
    id: '25',
    name: 'Jordy Caicedo',
    position: 'Delantero centro',
    category: CATEGORIES.FORWARD,
    number: 25,
    description:
      'Delantero de área con presencia física. Potente en el remate, juega bien de espaldas al arco y sabe asociarse con sus compañeros.',
  },
  {
    id: '26',
    name: 'Jeremy Arévalo',
    position: 'Delantero',
    category: CATEGORIES.FORWARD,
    number: 27,
    description:
      'Atacante joven con olfato goleador. Se mueve bien en el área rival y tiene instinto para aparecer en el momento justo.',
  },
];

export default PLAYERS;

// ─── Helpers ───────────────────────────────────────────────────────────

/**
 * Devuelve los jugadores agrupados por categoría, en el orden
 * definido por CATEGORY_ORDER.
 */
export const getPlayersByCategory = () => {
  const grouped = {};
  for (const cat of CATEGORY_ORDER) {
    grouped[cat] = [];
  }
  PLAYERS.forEach((player) => {
    if (grouped[player.category]) {
      grouped[player.category].push(player);
    }
  });
  return grouped;
};

/**
 * Devuelve un jugador por su id, o null si no existe.
 */
export const getPlayerById = (id) => {
  return PLAYERS.find((p) => p.id === id) ?? null;
};

/**
 * Retorna el total de jugadores por categoría.
 */
export const getCategoryCount = () => {
  const grouped = getPlayersByCategory();
  const counts = {};
  for (const [cat, players] of Object.entries(grouped)) {
    counts[cat] = players.length;
  }
  return counts;
};

