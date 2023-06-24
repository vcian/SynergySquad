import mysql from 'mysql2';
import { ConnectionOptions } from 'mysql2';
import { createClient } from 'redis';
export const connectMysql = async (config: ConnectionOptions) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export const connectRedis = async () => {
  const client = createClient({ url: 'redis://localhost:6379' });
  await client.connect();
  return client;
};
