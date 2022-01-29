import { ValidateProps } from '@/api-lib/constants';
import { findPosts, insertPost } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import nc, { ncOpts } from '@/api-lib/nc';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(database);

handler.get(async (req, res) => {
  const posts = await findPosts(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ posts });
});

handler.post(
  ...auths,
  upload.single('postImage'),
  validateBody({
    type: 'object',
    properties: {
      content: ValidateProps.post.content,
    },
    // required: ['content'],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    let postImage;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      postImage = image.secure_url;
    }

    const post = await insertPost(req.db, {
      content: req.body.content,
      image: postImage,
      creatorId: req.user._id,
    });

    return res.json({ post });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
