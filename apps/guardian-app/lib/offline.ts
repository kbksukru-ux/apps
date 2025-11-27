import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;
try {
  db = SQLite.openDatabaseSync('terraguard.db');
} catch (e) {
  console.warn('Failed to open SQLite DB:', e);
}

export async function initOfflineTables() {
  if (!db) {
    console.warn('SQLite database not available, running in web mode');
    return;
  }
  try {
    await db.execAsync?.(
      `CREATE TABLE IF NOT EXISTS identifications (
          id TEXT PRIMARY KEY,
          payload TEXT,
          createdAt TEXT
        );`,
    );
    await db.execAsync?.(
      `CREATE TABLE IF NOT EXISTS guides (
          slug TEXT PRIMARY KEY,
          body TEXT,
          updatedAt TEXT
        );`,
    );
    console.log('Offline tables initialized successfully');
  } catch (e) {
    console.warn('SQLite init failed, running in fallback mode:', e);
  }
}

export async function cacheIdentification(id: string, payload: unknown) {
  if (!db) return; // Skip on web
  try {
    await db.runAsync?.('INSERT OR REPLACE INTO identifications (id, payload, createdAt) VALUES (?,?,?)', [
      id,
      JSON.stringify(payload),
      new Date().toISOString(),
    ]);
  } catch (e) {
    console.warn('Failed to cache identification:', e);
  }
}

export async function readCachedIdentifications() {
  if (!db) return []; // Return empty array on web
  const rows = await db.getAllAsync?.('SELECT * FROM identifications ORDER BY createdAt DESC LIMIT 5');
  return rows?.map((row: any) => ({ id: row.id, data: JSON.parse(row.payload) })) ?? [];
}

export async function cacheGuides(guides: any[]) {
  if (!db) return; // Skip on web
  try {
    for (const guide of guides) {
      await db.runAsync?.('INSERT OR REPLACE INTO guides (slug, body, updatedAt) VALUES (?,?,?)', [
        guide.slug,
        JSON.stringify(guide),
        new Date().toISOString(),
      ]);
    }
  } catch (e) {
    console.warn('Failed to cache guides:', e);
  }
}

export async function readCachedGuides() {
  if (!db) return []; // Return empty array on web
  const rows = await db.getAllAsync?.('SELECT body FROM guides');
  return rows?.map((row: any) => JSON.parse(row.body)) ?? [];
}

