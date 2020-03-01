ALTER TABLE scfish.user
CHANGE COLUMN created_time created_time TIMESTAMP NOT NULL DEFAULT current_timestamp,
CHANGE COLUMN updated_time updated_time TIMESTAMP NOT NULL DEFAULT current_timestamp on update current_timestamp;

ALTER TABLE scfish.post
CHANGE COLUMN created_time created_time TIMESTAMP NOT NULL DEFAULT current_timestamp,
CHANGE COLUMN updated_time updated_time TIMESTAMP NOT NULL DEFAULT current_timestamp on update current_timestamp;

ALTER TABLE scfish.comment
CHANGE COLUMN created_time created_time TIMESTAMP NOT NULL DEFAULT current_timestamp,
CHANGE COLUMN updated_time updated_time TIMESTAMP NOT NULL DEFAULT current_timestamp on update current_timestamp;

ALTER TABLE scfish.like
CHANGE COLUMN created_time created_time TIMESTAMP NOT NULL DEFAULT current_timestamp,
CHANGE COLUMN updated_time updated_time TIMESTAMP NOT NULL DEFAULT current_timestamp on update current_timestamp;
ALTER TABLE scfish.like RENAME TO scfish.likes ;

ALTER TABLE scfish.image
CHANGE COLUMN created_time created_time TIMESTAMP NOT NULL DEFAULT current_timestamp,
CHANGE COLUMN updated_time updated_time TIMESTAMP NOT NULL DEFAULT current_timestamp on update current_timestamp;

ALTER TABLE scfish.favorite
CHANGE COLUMN created_time created_time TIMESTAMP NOT NULL DEFAULT current_timestamp,
CHANGE COLUMN updated_time updated_time TIMESTAMP NOT NULL DEFAULT current_timestamp on update current_timestamp;
