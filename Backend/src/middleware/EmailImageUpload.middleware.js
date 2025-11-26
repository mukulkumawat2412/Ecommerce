// emailImageUpload.middleware.js
import multer from "multer";

const emailImageStorage = multer.memoryStorage();

export const emailImageUpload = multer({
  storage: emailImageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit (optional)
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  }
});
