CREATE SCHEMA IF NOT EXISTS products DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE products ;

CREATE TABLE IF NOT EXISTS products.category (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (id))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS products.product (
    id BIGINT NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NULL DEFAULT NULL,
    name VARCHAR(255) NULL DEFAULT NULL,
    category_id BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    INDEX FK1mtsbur82frn64de7balymq9s (category_id ASC) VISIBLE,
    CONSTRAINT FK1mtsbur82frn64de7balymq9s
    FOREIGN KEY (category_id)
    REFERENCES products.category (id))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS products.user (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NULL DEFAULT NULL,
    password VARCHAR(255) NULL DEFAULT NULL,
    role VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX UKob8kqyqqgmefl0aco34akdtpe (email ASC) VISIBLE)
    ENGINE = InnoDB
    AUTO_INCREMENT = 3
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;