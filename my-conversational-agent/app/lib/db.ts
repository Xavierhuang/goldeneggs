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

// Initialize the database with the email_signups table for newsletter signups
// This is separate from the subscribers table (which is for full user accounts)
db.exec(`
  CREATE TABLE IF NOT EXISTS email_signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface Subscriber {
  id: number;
  email: string;
  password_hash: string | null;
  created_at: string;
}

export interface EmailSignup {
  id: number;
  email: string;
  created_at: string;
}

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

export function addEmailSignup(email: string) {
  try {
    const stmt = db.prepare('INSERT INTO email_signups (email) VALUES (?)');
    const result = stmt.run(email);
    return { success: true, id: result.lastInsertRowid };
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, error: 'Email already signed up' };
    }
    return { success: false, error: error.message };
  }
}

export function getSubscribers() {
  const stmt = db.prepare('SELECT * FROM subscribers ORDER BY created_at DESC');
  return stmt.all();
}

export function getEmailSignups() {
  const stmt = db.prepare('SELECT * FROM email_signups ORDER BY created_at DESC');
  return stmt.all();
}

export function getSubscriberByEmail(email: string): Subscriber | undefined {
  const stmt = db.prepare('SELECT * FROM subscribers WHERE email = ?');
  return stmt.get(email) as Subscriber | undefined;
}

export function setSubscriberPaid(email: string, paid: number) {
  const stmt = db.prepare('UPDATE subscribers SET paid = ? WHERE email = ?');
  return stmt.run(paid, email);
}

export default db; 