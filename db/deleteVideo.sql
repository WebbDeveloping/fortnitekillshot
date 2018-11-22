DELETE FROM users_video_link
WHERE id = $1;

SELECT p.* u.gamertag as author, u.id as user_video_link
FROM users_video_link p
JOIN users u ON u.id = p.user_id;