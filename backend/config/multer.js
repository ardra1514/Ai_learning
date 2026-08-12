import fs from "fs";
import path from "path";
import multer from "multer";

import { fileURLToPath } from "url";

const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);


// upload directory
const uploadDir = path.join(
    __dirname,
    "../uploads/documents"
);


// create uploads folder if not exists
if (!fs.existsSync(uploadDir)) {

    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}


// configure storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {

        const uniqueSuffix =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9);

        cb(
            null,
            `${uniqueSuffix}-${file.originalname}`
        );
    }
});


// file filter - only pdf
const fileFilter = (
    req,
    file,
    cb
) => {

    if (
        file.mimetype ===
        "application/pdf"
    ) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only PDF files are allowed"
            ),
            false
        );
    }
};


// configure multer
const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {

        fileSize:
            parseInt(
                process.env.MAX_FILE_SIZE
            ) || 10485760
    }
});

export default upload;