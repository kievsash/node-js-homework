CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS students (
   id uuid PRIMARY KEY,
   name VARCHAR(100)
);

CREATE OR REPLACE PROCEDURE add_student(student_name VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
   INSERT INTO students (id, name)
   VALUES (uuid_generate_v4(), student_name);
END;
$$;
