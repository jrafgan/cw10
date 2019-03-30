CREATE SCHEMA `cw10` DEFAULT CHARACTER SET utf8 ;

USE `cw10`;

CREATE TABLE `News` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `header` VARCHAR(45) NOT NULL,
  `news_body` VARCHAR(255) NOT NULL,
  `image` VARCHAR(100) NULL,
  `date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `Comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `news_id` INT NOT NULL,
  `author` VARCHAR(45) NOT NULL,
  `comment` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `cw10`.`News` (`id`, `header`, `news_body`, `image`, `date`) VALUES ('1', ';l;lmkl;k\';l', 'HyperX, являющаяся игровым подразделением компании Kingston Technology, объявила о старте продаж игровой гарнитуры Cloud MIX на территории нашей страны. Данная модель была анонсирована осенью прошлого года и демонстрировалась на выставке CES 2019.', '', '20-13-2018');

ALTER TABLE `Comments`
ADD INDEX `news_id_idx` (`news_id` ASC);
ALTER TABLE `Comments`
ADD CONSTRAINT `news_id`
  FOREIGN KEY (`news_id`)
  REFERENCES `News` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

INSERT INTO `Comments` (`id`, `news_id`, `author`, `comment`) VALUES ('1', '1', 'anonymous', 'jdfhqwhfiouiqr0wu');
INSERT INTO `Comments` (`id`, `news_id`, `author`, `comment`) VALUES ('2', '1', 'dsjhfjksfhkl', 'dsjnjkfhkl kjdfhashk ksjdfhj');

ALTER TABLE `Comments`
DROP FOREIGN KEY `news_id`;
ALTER TABLE `Comments`
ADD CONSTRAINT `news_id`
  FOREIGN KEY (`news_id`)
  REFERENCES `cw10`.`News` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;