


CREATE DATABASE database_links;
USE database_links;

CREATE TABLE users (
    id INT(11) AUTO_INCREMENT, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    fullname VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
)

DESCRIBE users;

CREATE TABLE links (
    id INT(11), 
    title VARCHAR(255) NOT NULL, 
    url VARCHAR(255) NOT NULL, 
    description VARCHAR(300) NOT NULL, 
    user_id INT(11), 
    created_at timestamp NOT NULL DEFAULT current_timestamp, 
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);









