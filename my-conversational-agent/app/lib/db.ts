import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'subscribers.db');
const db = new Database(dbPath);

// Initialize the database with the subscribers table
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export function addSubscriber(email: string, passwordHash?: string | null) {
  try {
    const stmt = db.prepare('INSERT INTO subscribers (email, password_hash) VALUES (?, ?)');
    const result = stmt.run(email, passwordHash || null);
    return { success: true, id: result.lastInsertRowid };
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, error: 'Email already subscribed' };
    }
    return { success: false, error: error.message };
  }
}

export function getSubscribers() {
  const stmt = db.prepare('SELECT * FROM subscribers ORDER BY created_at DESC');
  return stmt.all();
}

export function getSubscriberByEmail(email: string) {
  const stmt = db.prepare('SELECT * FROM subscribers WHERE email = ?');
  return stmt.get(email);
}

export function setSubscriberPaid(email: string, paid: number) {
  const stmt = db.prepare('UPDATE subscribers SET paid = ? WHERE email = ?');
  return stmt.run(paid, email);
}

export default db; 