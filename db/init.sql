-- Reset the tables
DROP TABLE comment, "user", snippet, language;

-- Create all the tables

CREATE TABLE comment
(
  id SERIAL PRIMARY KEY,
  body text,
  author text
);

CREATE TABLE "user"
(
  username text PRIMARY KEY,
  name text,
  profile_pic text,
  password text
);

CREATE TABLE snippet
(
  id SERIAL PRIMARY KEY,
  author text,
  code text,
  title text,
  description text,
  language text,
  favorites numeric
);

CREATE TABLE language
(
  name text PRIMARY KEY
);

-- TODO: Set the relationships

-- ALTER TABLE "Comment" ADD FOREIGN KEY ("author") REFERENCES "User" ("username");

-- ALTER TABLE "Snippet" ADD FOREIGN KEY ("author") REFERENCES "User" ("username");

-- ALTER TABLE "Snippet" ADD FOREIGN KEY ("language") REFERENCES "Language" ("name");

-- Add in the data

INSERT INTO snippet
  (author, title, code)
VALUES
  ('J.K. Rowling', 'Harry Potter', '// something harry would say');

INSERT INTO "user"
  (username, name)
VALUES
  ('scooter', 'Scott');