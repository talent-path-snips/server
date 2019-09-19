DROP TABLE IF EXISTS snippet;
DROP TABLE IF EXISTS author;
CREATE TABLE author (username TEXT PRIMARY KEY, password TEXT);
CREATE TABLE snippet (
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  favorites INT DEFAULT 0,
  author TEXT REFERENCES author,
  language TEXT
);
-- Seed authors with data
INSERT INTO
  author (username, password)
VALUES
  ('andrew', 'password');
-- Seed snippets with data
INSERT INTO
  snippet (code, title, description, language, author)
VALUES
  (
    'const america = 1776',
    'freedom',
    'I declared a const',
    'JavaScript',
    'andrew'
  ),
  (
    '4 + 4',
    'addition',
    'This is how you add',
    'Algebra',
    'andrew'
  );