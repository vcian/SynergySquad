import { Request, Response } from 'express';
import { connectMysql } from '../utils/db_connection';
import { DBConfig } from '../entities/db_config';
import { dataSource } from '../entities';
import { v4 as uuidv4, v4 } from 'uuid';

export const saveDBConfig = async (req: Request, res: Response) => {
  const { type, host, user, password, database } = req.body;
  if (type === 'mysql') {
    try {
      await connectMysql({
        host,
        user,
        password,
        database,
      });
      const dbRepository = dataSource.getRepository(DBConfig);
      const session_id = uuidv4();
      const result = dbRepository.create({
        session_id: session_id,
        type,
        database,
        host,
        user,
        password,
      });
      await dbRepository.save(result);

      res.status(201).send({
        status: 1,
        message: 'successfully save config',
        session_id,
      });
    } catch (error) {
      res.status(400).send({
        status: 0,
        message: 'Invalid db config',
      });
    }
  } else {
    res.status(400).send('db not supported');
  }
};
