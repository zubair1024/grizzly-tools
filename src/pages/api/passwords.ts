// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { simple, strong } from 'dinopass-node';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  simplePass: string;
  strongPass: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const simplePass = (await simple(1))[0];
  const strongPass = (await strong(1))[0];
  res.status(200).json({ simplePass, strongPass });
}
