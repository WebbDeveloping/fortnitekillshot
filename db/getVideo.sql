SELECT p.*, u.gamertag as author, u.id as userId
from users_video_link p
join users u ON u.id = p.user_id
WHERE p.id = $1