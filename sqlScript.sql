CREATE SCHEMA `hw79_extra` DEFAULT CHARACTER SET utf8 ;
USE `hw79_extra`;

CREATE TABLE `Categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `Places` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `Items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `category_fk` INT NOT NULL,
  `place_fk` INT NOT NULL,
  `description` VARCHAR(255) NULL,
  `image` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `Items`
ADD CONSTRAINT `category_id_fk`
  FOREIGN KEY (`category_fk`)
  REFERENCES `Categories` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `Items`
ADD CONSTRAINT `place_id_fk`
  FOREIGN KEY (`place_fk`)
  REFERENCES `Places` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

INSERT INTO `Places` (`name`, `description`)
VALUES
	('Кабинет директора', '3-й этаж, 303-каб'),
	('Учительская', '2-й этаж, 207-каб'),
	('Офис №1', '1-й этаж, 101-каб')
    ;

INSERT INTO `Categories` (`name`, `description`)
VALUES
	('Мебель', 'Мягкая, корпусная'),
	('Компьютерное оборудование', 'Все, что касается компьютера'),
	('Бытовая техника', 'Электро-оборудование, кроме компьютерного')
    ;

INSERT INTO `Items` (`id`, `name`, `category_fk`, `place_fk`, `description`, `image`)
  VALUES
  	(1, 'золотой стул', 1, 1, '1 штука', 'http://fontan-humor-odessa.com/images/site-elements/znak-gambs-large.png'),
  	(2, 'ноутбук', 2, 2, '3 штука', 'http://pomoshkomp.ru/wp-content/uploads/2014/08/324.jpg'),
  	(3, 'микроволновка', 3, 3, '2 штука', 'http://vybortech.ru/wp-content/uploads/2015/07/1680_0.jpg')
    ;