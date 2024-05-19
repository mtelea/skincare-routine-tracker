import app from './app';
import { Server } from 'http';

let server: Server;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  server = app.listen(3000);
}

export { app, server };
