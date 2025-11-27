-- TABLE role
CREATE TABLE IF NOT EXISTS role (
    id_role SERIAL PRIMARY KEY,
    name_role VARCHAR(50) NOT NULL UNIQUE
);

-- TABLE sessions
CREATE TABLE IF NOT EXISTS sessions (
    id_session SERIAL PRIMARY KEY,
    name_session VARCHAR(100) NOT NULL UNIQUE
);

-- TABLE users
CREATE TABLE IF NOT EXISTS users (
    id_users SERIAL PRIMARY KEY,
    lastname VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    pseudo VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    profile_picture VARCHAR(150),
    status BOOLEAN,
    id_role INT,
    id_session INT,
    FOREIGN KEY (id_role) REFERENCES role(id_role),
    FOREIGN KEY (id_session) REFERENCES sessions(id_session)
);

-- TABLE modules
CREATE TABLE IF NOT EXISTS modules (
    id_modules SERIAL PRIMARY KEY,
    name_modules VARCHAR(50) NOT NULL UNIQUE
);

-- TABLE categories
CREATE TABLE IF NOT EXISTS categories (
    id_categories SERIAL PRIMARY KEY,
    name_categories VARCHAR(50) NOT NULL UNIQUE
);

-- TABLE classes
CREATE TABLE IF NOT EXISTS classes (
    id_classes SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    img_classes VARCHAR(150),
    id_admin INT,
    id_modules INT,
    FOREIGN KEY (id_admin) REFERENCES users(id_users),
    FOREIGN KEY (id_modules) REFERENCES modules(id_modules)
);

-- TABLE user_class (relation N-N)
CREATE TABLE IF NOT EXISTS user_class (
    id_student INT,
    id_classes INT,
    PRIMARY KEY (id_student, id_classes),
    FOREIGN KEY (id_student) REFERENCES users(id_users),
    FOREIGN KEY (id_classes) REFERENCES classes(id_classes)
);

-- TABLE categories_class (relation N-N)
CREATE TABLE IF NOT EXISTS categories_class (
    id_classes INT,
    id_categories INT,
    PRIMARY KEY (id_classes, id_categories),
    FOREIGN KEY (id_classes) REFERENCES classes(id_classes),
    FOREIGN KEY (id_categories) REFERENCES categories(id_categories)
);
