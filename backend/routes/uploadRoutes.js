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
function fileFilter(req, file, cb) {
    // regex of allowable file types
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
    // check extension of file name against allowable file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images only!'), false); // error
    }
};

// middleware
const upload = multer({ storage, fileFilter });
// NOTE: file.fieldname == 'image'
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err) {
            res.status(400).send({ message: err.message });
        }

        res.status(200).send({
            message: 'Image Uploaded',
            image: `/${req.file.path}`,
        });
    })
});

export default router;