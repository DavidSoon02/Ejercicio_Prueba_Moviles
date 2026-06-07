const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const REQUEST_TIMEOUT_MS = 8000;

const imageCache = new Map();
const pendingRequests = new Map();

const IMAGE_FIELDS_BY_PRIORITY = ['strThumb', 'strCutout', 'strRender'];

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function getBestImageFromPlayer(player) {
  if (!player || typeof player !== 'object') {
    return null;
  }

  for (const field of IMAGE_FIELDS_BY_PRIORITY) {
    const imageUrl = player[field];

    if (typeof imageUrl === 'string' && imageUrl.trim()) {
      return imageUrl.trim();
    }
  }

  return null;
}

function sortPlayersByMatch(players, playerName) {
  const normalizedName = normalizeText(playerName);

  return [...players].sort((a, b) => {
    const nameA = normalizeText(a?.strPlayer);
    const nameB = normalizeText(b?.strPlayer);

    const scoreA =
      nameA === normalizedName ? 3 : nameA.includes(normalizedName) ? 2 : 1;
    const scoreB =
      nameB === normalizedName ? 3 : nameB.includes(normalizedName) ? 2 : 1;

    return scoreB - scoreA;
  });
}

async function fetchWithTimeout(url) {
  if (typeof AbortController === 'undefined') {
    return fetch(url);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchPlayerImage(playerName) {
  const url = `${API_BASE_URL}/searchplayers.php?p=${encodeURIComponent(
    playerName
  )}`;

  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const players = Array.isArray(data?.player) ? data.player : [];

  if (!players.length) {
    return null;
  }

  const matchedPlayers = sortPlayersByMatch(players, playerName);

  for (const player of matchedPlayers) {
    const imageUrl = getBestImageFromPlayer(player);

    if (imageUrl) {
      return imageUrl;
    }
  }

  return null;
}

export async function getPlayerImage(playerName) {
  const cleanName = String(playerName || '').trim();

  if (!cleanName) {
    return null;
  }

  const cacheKey = normalizeText(cleanName);

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const request = fetchPlayerImage(cleanName)
    .catch(() => null)
    .then((imageUrl) => {
      imageCache.set(cacheKey, imageUrl);
      return imageUrl;
    })
    .finally(() => {
      pendingRequests.delete(cacheKey);
    });

  pendingRequests.set(cacheKey, request);
  return request;
}
