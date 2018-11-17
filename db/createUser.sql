INSERT INTO users (gamertag, email, password)
VALUES (${gamertag}, ${email}, ${hash})
RETURNING *;