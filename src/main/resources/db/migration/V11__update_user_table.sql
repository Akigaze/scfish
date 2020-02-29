ALTER TABLE `scfish`.`user`
ADD COLUMN `avatar_thumbnail` blob AFTER `password`,
ADD COLUMN `avatar` mediumblob AFTER `avatar_thumbnail`
