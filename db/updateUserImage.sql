UPDATE users
SET userImage = ${uploadedImage}
WHERE id = ${id}
RETURNING userImage;