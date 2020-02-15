CREATE TABLE `scfish`.`like` (
  `id` int(45) NOT NULL AUTO_INCREMENT,
  `post_id` int(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
);