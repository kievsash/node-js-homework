CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tokens (
                                      id SERIAL PRIMARY KEY,
                                      user_id INT NOT NULL,
                                      access_token TEXT NOT NULL,
                                      refresh_token TEXT NOT NULL,
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

    ALTER TABLE tokens ADD CONSTRAINT unique_user_id UNIQUE (user_id);
