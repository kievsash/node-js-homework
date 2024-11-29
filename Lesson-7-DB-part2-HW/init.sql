CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS students (
   id uuid PRIMARY KEY,
   name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username)
);

CREATE OR REPLACE PROCEDURE add_student(student_name VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
   INSERT INTO students (id, name)
   VALUES (uuid_generate_v4(), student_name);
END;
$$;
