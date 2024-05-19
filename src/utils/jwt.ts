import jwt from 'jsonwebtoken';

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, 'jwt_secret', { expiresIn: '1h' });
};
