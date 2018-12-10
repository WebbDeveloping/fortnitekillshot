UPDATE users
SET gamertag = ${gamertag}
WHERE id = ${id}
RETURNING *;