DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT, 
    is_completed boolean
);