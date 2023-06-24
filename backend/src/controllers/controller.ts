import { NextFunction, Request, Response } from 'express';
import { connectMysql } from '../utils/db_connection';
import { DBConfig } from '../entities/db_config';
import { dataSource } from '../entities';
import { v4 as uuidv4, v4 } from 'uuid';
import { OpenAI } from 'langchain/llms/openai';
import { SqlDatabase } from 'langchain/sql_db';
import { SqlDatabaseChain } from 'langchain/chains';

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
const model = new OpenAI({
  openAIApiKey: process.env.openAIKey,
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
});
export const chat = async (req: Request, res: Response, next: NextFunction) => {
  const { promt } = req.body;
  const session_id = req.headers.session_id as string;
  if (!session_id) {
    throw new Error('session id is not received');
  }
  const dbRepository = dataSource.getRepository(DBConfig);
  const config = await dbRepository.findOne({ where: { session_id } });
  if (!config) {
    return res.status(400).send({
      status: 0,
      message: 'No config found',
    });
  } else {
    const { database, user, host, password } = config;
    const type: any = config.type;
    const connectorPackage = 'mysql2';
    const db = await SqlDatabase.fromOptionsParams({
      appDataSourceOptions: {
        type,
        host,
        connectorPackage,
        database,
        username: user,
        password,
      },
    });
    const chain = new SqlDatabaseChain({
      llm: model,
      database: db,
    });
    const result = await chain.run(promt);
    res.status(200).send(result);
  }
};
