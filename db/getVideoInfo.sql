SELECT uvl.*, u.gamertag as author, u.id as userId
from users_video_link uvl
join users u ON u.id = uvl.user_id
WHERE uvl.id = $1