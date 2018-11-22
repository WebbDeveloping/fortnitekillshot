create table users
(id integer primary key, 
gamertag string, 
email varchar, 
password varchar);

create table user_video_link(
    id serial primary key,
    user_id int references users,
    video_url varchar
)