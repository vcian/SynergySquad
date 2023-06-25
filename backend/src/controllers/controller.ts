import { NextFunction, Request, Response } from 'express';
import { connectMysql, connectRedis } from '../utils/db_connection';
import { DBConfig } from '../entities/db_config';
import { dataSource } from '../entities';
import { v4 as uuidv4, v4 } from 'uuid';
import { OpenAI } from 'langchain/llms/openai';
import { SqlDatabase } from 'langchain/sql_db';
import { SqlDatabaseChain } from 'langchain/chains';
import { Chat } from '../entities/chat';
import puppeteer from 'puppeteer';
import path from 'path';
import ejs from 'ejs';
import createHttpError from 'http-errors';
import { downloadpdf } from '../utils/print';
import { emailSend } from '../utils/sendMail';

// const redisClient = (async () => await connectRedis())();
let db: any = null;
let chain: any = null;
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
  let { prompt } = req.body;
  const session_id = req.headers.session_id as string;
  const chatRepository = dataSource.getRepository(Chat);
  const originalPrompt: string = prompt;
  if (!prompt.match(/in json format/i)) {
    prompt +=
      'Return only list data in JSON format and return only 20 data not other fields like search data or sql query';
  }
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
    // const lastSession = await (await redisClient).get('lastSession');
    // if (lastSession != session_id) {
    //   db = null;
    // }
    if (!db) {
      db = await SqlDatabase.fromOptionsParams({
        appDataSourceOptions: {
          type,
          host,
          connectorPackage,
          database,
          username: user,
          password,
        },
      });
      chain = new SqlDatabaseChain({
        llm: model,
        database: db,
        verbose: false,
      });
    }

    const result = await chain.run(prompt);
    // (await redisClient).set('lastSession', session_id);
    const createdChat = chatRepository.create({
      prompt: originalPrompt,
      session_id: session_id,
      answer: result,
    });
    await chatRepository.save(createdChat);
    res.status(200).send(result);
  }
};

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chatRepository = dataSource.getRepository(Chat);
    const result = await chatRepository.find({
      where: { session_id: req.headers.session_id as string },
    });
    res.send({
      status: 1,
      message: 'success',
      result,
    });
  } catch (error) {
    res.status(400).send({
      status: 0,
      message: 'failed',
    });
  }
};

export const sendMail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data, header, email } = req.body;

  const filePath = path.join(__dirname, 'index.ejs');

  ejs.renderFile(filePath, { header, data }, async (err, html) => {
    if (err) {
      throw createHttpError(500, 'Server is down');
    }
    await downloadpdf(html);
    await emailSend('lb.madesia@viitor.cloud');
    // enviar para o navegador
    return res.send('success');
  });
};
