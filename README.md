# 🇪🇨 La Tri

**Aplicación Móvil — Selección Ecuatoriana de Fútbol**

---

## 1. Nombre del proyecto

**La Tri** — Álbum digital interactivo de la Selección Ecuatoriana de Fútbol.

---

## 2. Descripción general

La Tri es una aplicación móvil desarrollada con **React Native** y **Expo Go** que simula un álbum de figuritas tipo Panini. La app permite explorar la plantilla actual de la Selección Ecuatoriana de Fútbol ("La Tri") a través de cartas coleccionables digitales organizadas por posición: arqueros, defensores, mediocampistas y delanteros.

Cada jugador está representado por una carta visual con su dorsal, nombre, posición y un avatar genérico. Al presionar una carta, se abre un modal tipo ficha profesional con información detallada del jugador.

---

## 3. Objetivo de la aplicación

- Demostrar el uso práctico de **React Native con Expo** para el desarrollo de aplicaciones móviles multiplataforma.
- Aplicar conceptos fundamentales como componentes funcionales, hooks (`useState`, `useEffect`, `useCallback`, `useRef`), animaciones con la API `Animated`, navegación por estado y manejo de datos estáticos.
- Crear una interfaz visual atractiva y funcional que funcione tanto en **iOS** como en **Android** (y parcialmente en web) desde un mismo código base.

---

## 4. Tecnologías utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| **React Native** | 0.81.5 | Framework de desarrollo móvil |
| **Expo** | SDK 54 | Plataforma de desarrollo y ejecución |
| **Expo Go** | — | Entorno de pruebas en dispositivo físico |
| **JavaScript (ES6+)** | — | Lenguaje de programación |
| **React** | 19.1.0 | Librería de interfaz de usuario |
| **@expo/vector-icons** | — | Iconografía (Ionicons) |
| **react-native-web** | — | Soporte de vista previa en navegador |

---

## 5. Estructura de carpetas

```
La Tri/
│
├── App.js                      ← Punto de entrada de la aplicación
├── app.json                    ← Configuración del proyecto Expo
├── package.json                ← Dependencias y scripts
├── index.js                    ← Registro de la aplicación
│
├── assets/                     ← Recursos estáticos
│   ├── icon.png                ← Icono de la aplicación
│   ├── splash-icon.png         ← Imagen de splash (nativa)
│   ├── favicon.png             ← Favicon para web
│   └── logo-ecuador.png        ← Logo de la selección (pendiente)
│
└── src/
    ├── screens/                ← Pantallas de la aplicación
    │   ├── SplashScreen.js     ← Pantalla de inicio animada
    │   └── HomeScreen.js       ← Pantalla principal tipo álbum
    │
    ├── components/             ← Componentes reutilizables
    │   ├── PlayerCard.js       ← Carta coleccionable tipo Panini
    │   └── PlayerModal.js      ← Modal de información del jugador
    │
    ├── data/                   ← Datos estáticos
    │   └── players.js          ← Plantilla de 27 jugadores
    │
    └── constants/              ← Constantes globales
        ├── colors.js           ← Paleta de colores oficial
        └── team.js             ← Información del equipo
```

---

## 6. Pantallas desarrolladas

### 6.1 Splash Screen

Pantalla de bienvenida con animaciones nativas de React Native:

- **Logo**: Aparece con efecto de opacidad y escala (spring animation) dando un sutil rebote.
- **Texto**: "La Tri" y el subtítulo aparecen deslizándose hacia arriba con un retardo progresivo (stagger).
- **Barra de carga**: Barra decorativa que se llena en 1.5 segundos.
- **Barra bandera**: Franja superior con los colores de Ecuador (amarillo, azul, rojo).
- **Auto-navegación**: Después de la animación, redirige automáticamente al HomeScreen.

### 6.2 Home Screen

Pantalla principal que funciona como el álbum digital:

- **Header**: Fondo azul oscuro con texto "Selección Ecuatoriana" y título "Álbum La Tri", más un ícono de fútbol con borde dorado.
- **Tarjeta de presentación**: Muestra el nombre del proyecto, una breve descripción y estadísticas (26 jugadores, 4 posiciones, ECU equipo).
- **Categorías animadas**: Cuatro secciones (Arqueros, Defensores, Mediocampistas, Delanteros) que aparecen con fade-in y slide-up escalonados.
- **Scroll horizontal**: Cada categoría contiene un carrusel de cartas de jugadores deslizable horizontalmente.

### 6.3 Cartas de jugadores (PlayerCard)

Componente de carta coleccionable tipo álbum Panini:

- **Franja bandera**: Parte superior con los tres colores de Ecuador.
- **Dorsal**: Número del jugador en badge azul oscuro con borde dorado (esquina superior izquierda).
- **Badge ECU**: Etiqueta roja con texto "ECU" (esquina superior derecha).
- **Avatar**: Círculo con borde dorado que muestra un ícono según la posición del jugador (escudo, balón, llama, estrella, etc.).
- **Nombre**: Texto centrado con límite de 2 líneas para evitar desbordes.
- **Posición**: Texto en rojo mayúsculas debajo del nombre.
- **Efecto press**: Escala y sombra al presionar la carta.

### 6.4 Modal de información (PlayerModal)

Ficha profesional del jugador que se abre al presionar una carta:

- **Header azul oscuro**: Con franja bandera superior, número destacado y badge ECU.
- **Avatar grande**: Montado sobre el header, con borde dorado y círculo interior amarillo claro.
- **Nombre**: Grande y en negrita.
- **Badge de posición**: Dorado con rojo, ícono y texto.
- **Sección "Información del jugador"**: Descripción textual del jugador.
- **Sección "Datos generales"**: Grid con tarjetas individuales para País (Ecuador), Categoría y Número.
- **Botón "Volver al álbum"**: Botón premium azul oscuro con borde dorado.

---

## 7. Cómo ejecutar el proyecto

### Requisitos previos

- Node.js (v18 o superior)
- Expo Go instalado en el dispositivo móvil (iOS/Android)
- Conexión a la misma red WiFi entre PC y dispositivo

### Pasos

```bash
# 1. Clonar o copiar el proyecto
cd La Tri

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npx expo start

# 4. Escanear el código QR con Expo Go
```

### Comandos adicionales

```bash
npx expo start --web          # Vista previa en navegador
npx expo start --no-dev --minify  # Modo producción (más rápido)
npx expo start --tunnel       # Acceso remoto mediante túnel
```

---

## 8. Componentes de React Native utilizados

| Componente | Uso en el proyecto |
|---|---|
| **`<View>`** | Contenedor base para layout, agrupación de elementos y fondos de secciones. Usado extensivamente en todas las pantallas y componentes. |
| **`<Text>`** | Renderizado de todo el contenido textual: nombres, posiciones, descripciones, estadísticas y etiquetas. |
| **`<Image>`** | Preparado para mostrar el logo de la selección en el SplashScreen (actualmente usa un placeholder emoji). |
| **`<ScrollView>`** | Desplazamiento vertical del HomeScreen y desplazamiento horizontal de las cartas por categoría. También usado dentro del Modal para contenido largo. |
| **`<FlatList>`** | No se utiliza directamente en la versión actual; se optó por `ScrollView` + `map()` para mantener el código simple y didáctico. |
| **`<Modal>`** | Implementado en PlayerModal para mostrar la ficha del jugador superpuesta con fondo semitransparente y animación de entrada. |
| **`<Pressable>`** | Manejo de eventos táctiles en PlayerCard con feedback visual (escala y sombra dinámica) al presionar. |
| **`<SafeAreaView>`** | Contenedor principal del HomeScreen para respetar el área segura en dispositivos con notch. |
| **`<StatusBar>`** | Control del estilo y color de la barra de estado en cada pantalla. |

### API `Animated`

Se utilizó la API nativa de animaciones de React Native (`Animated`) para:

- **SplashScreen**: `Animated.spring` para el rebote del logo, `Animated.timing` + `Animated.stagger` para la aparición progresiva de textos, y animación de la barra de carga.
- **HomeScreen**: `Animated.timing` con fade-in y slide-up para la entrada escalonada de las secciones de categorías.
- **useNativeDriver: true** en animaciones de opacidad y transformación para rendimiento óptimo.

### Hooks utilizados

| Hook | Propósito |
|---|---|
| `useState` | Manejo de estado del splash (`showSplash`), visibilidad del modal (`modalVisible`) y jugador seleccionado. |
| `useEffect` | Disparar animaciones al montar componentes y temporizador de navegación del splash. |
| `useCallback` | Optimización de funciones pasadas como props (evita re-renderizados innecesarios). |
| `useRef` | Referencia estable a valores animados (`Animated.Value`) para evitar recreaciones en cada render. |

---

