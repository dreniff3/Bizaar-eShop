import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// determines where file should be stored
const storage = multer.diskStorage({
    // describes which folder to store uploads ('uploads/')
    destination(req, file, cb) {
        // callback
        cb(null, 'uploads/'); // null is for error
    },
    // describes how file should be named (e.g., 'image-1709352734444.png')
    filename(req, file, cb) {
        // callback
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

// prevents users from uploading harmful files
function checkFileType(file, cb) {
    // regex of allowable file types
    const filetypes = /jpg|jpeg|png/;
    // check extension of file name against allowable file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!'); // error
    }
};

// middleware
const upload = multer({
    storage,
});

// NOTE: file.fieldname == 'image'
router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path}`,
    });
});

export default router;