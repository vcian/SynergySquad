import mysql from 'mysql2';
import { ConnectionOptions } from 'mysql2';
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
