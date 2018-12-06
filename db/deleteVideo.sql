

DELETE FROM users_video_link
WHERE id = $1;

SELECT uvl.*, u.gamertag as author, u.id as user_Id
FROM users_video_link uvl
JOIN users u ON u.id = uvl.user_id
WHERE u.id = $2;




