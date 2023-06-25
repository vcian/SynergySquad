import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { dataSource } from './entities';
import router from './routes/routes';
import { notFound, globalErrorHandler } from './middleware/globalErrorHandler';
import morgan from 'morgan';
import path from 'path';

const app: Express = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(router);
dataSource
  .initialize()
  .then(() => {
    console.log('Datasource has been initialized');
  })
  .catch((err) => {
    console.log('Error during Data Source initialization:', err);
  });

const port = process.env.PORT;
app.use(notFound);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`⚡️ Server started at PORT: ${port}`);
});
