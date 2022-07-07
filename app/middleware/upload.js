const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('multer_diskStorage',req.body);
    cb(null, __basedir + "/resources/static/assets/uploads/api/smartschool/"+req.body.type+"/");
  },
  filename: (req, file, cb) => {
   if(req.body.name)
   {
    cb(null, req.body.name+`-${file.originalname}`);//{Date.now()//
   }
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;