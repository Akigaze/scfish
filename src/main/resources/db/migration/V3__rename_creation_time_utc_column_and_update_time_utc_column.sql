ALTER TABLE `scfish`.`user`
CHANGE COLUMN `creation_time_utc` `created_time` TIMESTAMP NOT NULL ,
CHANGE COLUMN `update_time_utc` `updated_time` TIMESTAMP NOT NULL ;

ALTER TABLE `scfish`.`post`
    CHANGE COLUMN `creation_time_utc` `created_time` TIMESTAMP NOT NULL ,
    CHANGE COLUMN `update_time_utc` `updated_time` TIMESTAMP NOT NULL ;