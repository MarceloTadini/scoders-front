import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Remove o access_token do cookie
    res.setHeader('Set-Cookie', 'access_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');

    res.status(200).json({ message: 'Logout realizado com sucesso' });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}