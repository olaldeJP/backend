import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";
    if (req.body.type === "profile") {
      uploadPath = "./public/";
    } else if (req.body.type === "documents") {
      uploadPath = "./public/";
    } else if (req.body.type === "products") {
      uploadPath = "./public/storage/products";
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });
