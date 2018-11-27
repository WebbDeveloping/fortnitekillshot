INSERT INTO users_video_link (user_id, video_url)
VALUES (${user_id}, ${video_url});

SELECT p.*, u.gamertag as author, u.id as user_id
FROM users_video_link p
JOIN users u ON u.id = p.user_id
WHERE u.id = ${user_id};