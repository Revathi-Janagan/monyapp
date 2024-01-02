const multer = require("multer");
const path = require("path");

// Set the destination folder for uploaded files
const destination = (subfolder) => {
  return (req, file, cb) => {
    cb(null, `uploads/${subfolder}/`);
  };
};

// Generate a unique filename
const filename = (req, file, cb) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fieldName = Array.isArray(file.fieldname)
    ? file.fieldname[0]
    : file.fieldname;
  cb(null, fieldName + "-" + uniqueSuffix + path.extname(file.originalname));
};

// Create a multer storage configuration
const storage = (subfolder) =>
  multer.diskStorage({
    destination: destination(subfolder),
    filename: filename,
  });

// Create a function to filter image, video, and PDF files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "application/pdf",
    "video/mp4",
    "audio/mp3",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only image (JPEG, PNG, JPG, GIF), PDF, mp4, and mp3 files are allowed."
      ),
      false
    );
  }
};

// Create a multer instance with the provided storage and file filter configuration
const createMulterInstance = (subfolder) =>
  multer({
    storage: storage(subfolder),
    fileFilter: fileFilter,
  });

module.exports = {
  createMulterInstance,
};
