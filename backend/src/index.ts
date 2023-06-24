import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { dataSource } from './entities';
import router from './routes/routes';
import globalErrorHandler from './middleware/globalErrorHandler';
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
console.log(__dirname);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`⚡️ Server started at PORT: ${port}`);
});
