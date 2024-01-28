CREATE DATABASE jobs-done;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL
); 

CREATE TABLE jobs(
    id serial primary key,
    user_id int not null,
    job_name varchar(255) NOT NULL,
    done_date date NOT NULL,
    time_to_finish int NOT NULL
);

INSERT INTO users (user_name, user_password) VALUES ('admin', 'admin2023');
INSERT INTO users (user_name, user_password) VALUES ('user', 'user2023');
