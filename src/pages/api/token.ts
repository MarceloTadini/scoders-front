import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.cookies; // Pegando o token do cookie

  if (!access_token) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  return res.status(200).json({ access_token });
}
