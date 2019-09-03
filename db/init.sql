-- Reset the tables
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS snippet;
DROP TABLE IF EXISTS language;


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
  profilePicture text,
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

-- ALTER TABLE "comment" ADD FOREIGN KEY ("author") REFERENCES "user" ("username");

-- ALTER TABLE "snippet" ADD FOREIGN KEY ("author") REFERENCES "user" ("username");

-- ALTER TABLE "snippet" ADD FOREIGN KEY ("language") REFERENCES "language" ("name");

-- Add in the data

INSERT INTO snippet
  (author, title, code)
VALUES
  ('J.K. Rowling', 'Harry Potter', '// something harry would say');

INSERT INTO "user"
  (username, name)
VALUES
  ('scooter', 'Scott');