ALTER TABLE `scfish`.`user`
CHANGE COLUMN `name` `nickname` VARCHAR(100) NULL DEFAULT NULL ,
CHANGE COLUMN `id` `username` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `password` `password` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `enabled` `deleted` INT(1) NOT NULL DEFAULT 0 ;

ALTER TABLE `scfish`.`post`
CHANGE COLUMN `user_id` `username` VARCHAR(45) NOT NULL ;