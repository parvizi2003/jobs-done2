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
INSERT INTO jobs (user_id, job_name, done_date, time_to_finish) 
VALUES 
(1, 'admin-job-3', '2024-01-03', 30),
(1, 'admin-job-1', '2024-01-01', 10),
(1, 'admin-job-4', '2024-01-04', 40);
(1, 'admin-job-2', '2024-01-02', 20),

INSERT INTO users (user_name, user_password) VALUES ('user', 'user2023');
INSERT INTO jobs (user_id, job_name, done_date, time_to_finish) 
VALUES 
(2, 'user-job-3', '2024-01-07', 70),
(2, 'user-job-1', '2024-01-05', 50),
(2, 'user-job-4', '2024-01-08', 80);
(2, 'user-job-2', '2024-01-06', 60),