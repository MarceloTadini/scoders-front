import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'; // Certifique-se de instalar o axios: npm install axios

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await axios.post('https://product-api-7chz.onrender.com/auth/login', {
        email: email,
        password: password,
      });

      const accessToken = response.data.access_token;

      // Armazena o access_token em um cookie HTTP-only
      res.setHeader('Set-Cookie', `access_token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`);

      res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (error: any) {
      if (error.response) {
        res.status(error.response.status).json({ message: error.response.data.message || 'Usuário ou senha inválidos' });
      } else if (error.request) {
        res.status(500).json({ message: 'Não foi possível se conectar ao servidor' });
      } else {
        res.status(500).json({ message: error.message || 'Erro ao fazer login' });
      }
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}