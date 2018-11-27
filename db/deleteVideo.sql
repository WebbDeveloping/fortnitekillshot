
SELECT uvl.*, u.gamertag as author, u.id as user_Id
FROM users_video_link uvl
JOIN users u ON u.id = uvl.user_id;

DELETE FROM users_video_link
WHERE u.id = $1;