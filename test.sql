CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS session (
    user_id INT REFERENCES users(user_id),
    session VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cheanls (
    cheanl_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    short_link VARCHAR(255) UNIQUE NOT NULL,
    isVerify BOOLEAN DEFAULT FALSE,
    isPrivate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    owner_id INT REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS chats(
    chat_id SERIAL PRIMARY KEY,
    message_data VARCHAR(200) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users_cheanl (
    user_id INT REFERENCES users(user_id),
    cheanl_id INT REFERENCES cheanls(cheanl_id)
);

CREATE TABLE IF NOT EXISTS chats_cheanl (
    chats_id INT REFERENCES chats(chat_id),
    cheanl_id INT REFERENCES cheanls(cheanl_id)
);

CREATE TABLE IF NOT EXISTS tags(
    tag_id SERIAL PRIMARY KEY,
    tag_data VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS filds(
    fild_id SERIAL PRIMARY KEY,
    fild_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags_filds(
    tag_id INT REFERENCES tags(tag_id),
    fild_id INT REFERENCES filds(fild_id)
);