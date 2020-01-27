CREATE TABLE `scfish`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(100) NULL,
  `enabled` INT(1) NOT NULL DEFAULT 1,
  `creation_time_utc` TIMESTAMP NOT NULL,
  `update_time_utc` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE
);