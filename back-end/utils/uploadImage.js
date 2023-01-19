// Image upload
path = require('path')
function uploadImage(req) {
  const { image } = req.files;

  if (!image) return res.sendStatus(400);

  let reqPath = path.join(__dirname, "../upload/");

  image.mv(reqPath + image.name);
  return {
    imageName: image.name,
    imageUrl: "/upload/" + image.name,
  };
}

exports.uploadImage = uploadImage;
