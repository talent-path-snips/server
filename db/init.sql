/* From our current data
  {
    "id": "1",
    "author": "Dandy",
    "code": "// Welcome to JS!",
    "title": "single-line.js",
    "description": "This is how you do a single line comment in JS",
    "language": "javascript",
    "comments": [],
    "favorites": 0
  }
*/

-- "comments" field is missing

CREATE TABLE snippets
(
  id SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  code VARCHAR(7999) NOT NULL,
  description VARCHAR(500),
  language VARCHAR(100),
  favorites NUMERIC
);

INSERT INTO snippets
  (author, title, code)
VALUES
  ('J.K. Rowling', 'Harry Potter', '// something harry would say');