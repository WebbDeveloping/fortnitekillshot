create table users
(id integer primary key, 
gamertag string, 
email varchar, 
password varchar,
userImage text);

create table user_video_link(
    id serial primary key,
    user_id int references users,
    video_url varchar
)


things to add
users- links(twicth, youtube, facebook, instagram)
user_video_link- (stars, videoname, gunkill, ... ) or seperate video table that i bind together?