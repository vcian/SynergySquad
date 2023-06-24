import { Router } from 'express';
<<<<<<< HEAD
import { chat, chatDB, saveDBConfig } from '../controllers/controller';
import {
  validateChat,
  validateChatData,
  validateSaveDBConfig,
} from '../validators/validation';
=======
import { chat, getChat, saveDBConfig } from '../controllers/controller';
import { validateChat, validateSaveDBConfig } from '../validators/validation';
>>>>>>> 659645ac2a0abf6c8ed474fd9658f542cee0942e
import catchAsync from '../utils/catchAsync';
import { validation } from '../middleware/globalErrorHandler';

const router = Router();

router.post(
  '/connect',
  validation(validateSaveDBConfig),
  catchAsync(saveDBConfig),
);

router.post('/chat', validation(validateChat), catchAsync(chat));

router.post('/data', validation(validateChatData), catchAsync(chatDB));

router.get('/chat', getChat)

export default router;
