import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session?.user?.email) {
    const result = await prisma.article.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        users: {
          connect: { email: session?.user?.email },
        },
      },
    });
    toast.success('Bookmark successfully added', { duration: 3000 });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
