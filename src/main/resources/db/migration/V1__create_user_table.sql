CREATE TABLE `scfish`.`user` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(100) NULL,
  `password` VARCHAR(100) NULL,
  `enabled` INT(1) NOT NULL DEFAULT 1,
  `creation_time_utc` TIMESTAMP NOT NULL,
  `update_time_utc` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);
