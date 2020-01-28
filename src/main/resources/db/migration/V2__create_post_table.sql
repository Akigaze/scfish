CREATE TABLE `scfish`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `content` TEXT NULL,
  `creation_time_utc` TIMESTAMP NOT NULL,
  `update_time_utc` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);