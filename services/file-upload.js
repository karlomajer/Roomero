const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');

const s3 = new aws.S3({
  secretAccessKey: config.get('AWSsecretAccessKey'),
  accessKeyId: config.get('AWSaccessKeyId'),
  region: config.get('AWSregion'),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid Mime Type, only JPEG and PNG files are allowed.'),
      false
    );
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'roomero',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'Test' });
    },
    key: function (req, file, cb) {
      var fileExtension = file.originalname.split('.').pop();
      cb(null, Date.now().toString() + '.' + fileExtension);
    },
  }),
});

module.exports = upload;
