import { findUserById } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import nc, { ncOpts } from '@/api-lib/nc';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const user = await findUserById(req.db, req.query.userId);
  res.json({ user });
});

export default handler;
