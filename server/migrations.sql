PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS roles (
  role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE,
  password_hash TEXT,
  email TEXT,
  role_id INTEGER REFERENCES roles(role_id),
  class_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
  subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_name TEXT NOT NULL,
  teacher_id INTEGER REFERENCES users(user_id),
  capacity INTEGER DEFAULT 999,
  description TEXT
);

CREATE TABLE IF NOT EXISTS clubs (
  club_id INTEGER PRIMARY KEY AUTOINCREMENT,
  club_name TEXT NOT NULL,
  advisor_id INTEGER REFERENCES users(user_id),
  capacity INTEGER DEFAULT 999,
  description TEXT
);

CREATE TABLE IF NOT EXISTS registrations (
  reg_id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER REFERENCES users(user_id),
  subject_id INTEGER REFERENCES subjects(subject_id),
  club_id INTEGER REFERENCES clubs(club_id),
  status TEXT DEFAULT 'pending',
  approved_by INTEGER REFERENCES users(user_id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- seed roles
INSERT OR IGNORE INTO roles (role_id, role_name) VALUES (1,'admin'),(2,'teacher'),(3,'student');

-- seed admin user (password empty -> demo login allowed)
INSERT OR IGNORE INTO users (user_id, name, username, password_hash, email, role_id) VALUES (1,'ผู้ดูแลระบบ','admin','', 'admin@example.com',1);
