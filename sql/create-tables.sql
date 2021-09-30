-- Create tables for storing user details
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ratings;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4 (),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);



-- Creating table for storing user ratings

CREATE TABLE ratings(
    rating_id uuid DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    movie_id VARCHAR(255) NOT NULL,
    rating VARCHAR(255) NOT NULL,
    PRIMARY KEY(rating_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


