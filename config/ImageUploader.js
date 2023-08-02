import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

import { S3 } from "@aws-sdk/client-s3";

// aws region 및 자격증명 설정
AWS.config.update({    
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    region: 'ap-northeast-2', 
});
const s3 = new S3();

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];

// AWS S3 multer 설정
const imageUploader = multer({
    storage: multerS3({
      // 저장 위치
      s3: s3,
      bucket: process.env.AWS_BUCKET, // 생성한 버킷 이름
      key: (req, file, callback) => {
        const uploadDirectory = req.query.directory ?? '' // 업로드할 디렉토리를 설정하기 위해 넣어둔 코드로, 없어도 무관
        const extension = path.extname(file.originalname)
        if (!allowedExtensions.includes(extension)) { // extension 확인을 위한 코드로, 없어도 무관
          return callback(new Error('wrong extension'))
        }
        callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
      },
      acl: 'public-read-write'
    })
  })

export default imageUploader;