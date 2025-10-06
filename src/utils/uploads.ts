import multer from 'multer'
import path from 'path'
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join( "/var/www/uploads"));
    cb(null, path.join(process.cwd(), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage: storage })
 
// upload single image
const uploadSingle = upload.single('image')
 
// upload multiple image
const uploadMultiple = upload.fields([
  { name: 'singleImage', maxCount: 10 },
  { name: 'galleryImage', maxCount: 10 },
])
 
// upload multiple image
const uploadIndividual = upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
])
 
export const fileUploader = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadIndividual
}