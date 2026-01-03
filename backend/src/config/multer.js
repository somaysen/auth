const multer = require('multer');

const store = multer.memoryStorage();

const upload = multer({ storage: store });


module.exports = upload;