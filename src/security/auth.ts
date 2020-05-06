import jwt from 'jsonwebtoken';

const authSec = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send(new Error('Token não fornecido!'));

  const parts: string = authHeader.split(' ');

  if (!(parts.length === 2)) return res.status(401).send(new Error('Formato de token Inválidor!'));

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) res.status(401).send(new Error('Formato de token Inválido!'));
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) return res.status(401).send(new Error('Token Inválido!'));
    return next();
  });
};

export const authSecutiry = authSec;
