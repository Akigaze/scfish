ALTER TABLE `scfish`.`comment`
CHANGE COLUMN `username` `username` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `post_id` `post_id` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `comment_content` `content` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `created_time` `created_time` TIMESTAMP NOT NULL ;